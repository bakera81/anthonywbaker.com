import fs from 'fs'
import path from 'path'
import { useState } from 'react'
import Layout from '../../components/layout'
import PageTitle from '../../components/pagetitle'
import projectImage from '../../public/images/projects/what-record-should-i-buy/Daft_Punk_-_Random_Access_Memories.jpg'
import styles from './album-ranker.module.css'
import shuffle from '../../utils/shuffle'

export const frontmatter = {
  title: 'Album Ranker',
  description: 'Compare albums head to head and build a pairwise ranking from cover art.',
  slug: 'album-ranker',
  preview: projectImage,
  themeColor: 'rgb(20, 20, 35)',
  updatedAt: '2026-06-02',
  completed: true,
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function normalizeFilename(filename) {
  return filename.replace(/\.[^/.]+$/, '')
}

function parseAlbumFile(name) {
  const clean = normalizeFilename(name)
  const [artistSegment, ...albumParts] = clean.split(' - ')
  const artist = artistSegment ? artistSegment.replace(/_/g, ' ') : 'Unknown Artist'
  const album = albumParts.length > 0 ? albumParts.join(' - ').replace(/_/g, ' ') : 'Unknown Album'
  return { artist, album, file: name }
}

function pickTwoRandom(items) {
  const firstIndex = randomInt(0, items.length - 1)
  let secondIndex = randomInt(0, items.length - 2)
  if (secondIndex >= firstIndex) secondIndex += 1
  return [items[firstIndex], items[secondIndex]]
}

function pickRandomInitialPair(unplayed, allAlbums) {
  if (unplayed.length >= 2) {
    return pickTwoRandom(unplayed)
  }
  if (unplayed.length === 1) {
    const first = unplayed[0]
    const otherOptions = allAlbums.filter((album) => album.id !== first.id)
    if (otherOptions.length === 0) {
      return [first, null]
    }
    const other = otherOptions[randomInt(0, otherOptions.length - 1)]
    return [first, other]
  }
  return null
}

function buildInitialPairs(albums) {
  const shuffled = shuffle([...albums])
  const pairs = []
  for (let i = 0; i < shuffled.length - 1; i += 2) {
    pairs.push([shuffled[i], shuffled[i + 1]])
  }

  if (shuffled.length % 2 === 1 && shuffled.length > 1) {
    const last = shuffled[shuffled.length - 1]
    const partner = shuffled[randomInt(0, shuffled.length - 2)]
    if (partner.id !== last.id) {
      pairs.push([last, partner])
    }
  }

  return pairs
}

function getBinarySortExpectedComparisons(count) {
  return Math.ceil(count * Math.log2(count))
}

function initializeELO(albums) {
  const trueskill = {}
  for (const album of albums) {
    trueskill[album.id] = {
      mu: 1000,
      sigma: 333.33,
    }
  }
  return trueskill
}

function calculateWinProbability(muA, sigmaA, muB, sigmaB) {
  const c = Math.sqrt(sigmaA * sigmaA + sigmaB * sigmaB)
  const d = (muA - muB) / c
  return 0.5 + 0.5 * erf(d / Math.sqrt(2))
}

function erf(x) {
  const a1 = 0.254829592
  const a2 = -0.284496736
  const a3 = 1.421413741
  const a4 = -1.453152027
  const a5 = 1.061405429
  const p = 0.3275911
  const sign = x < 0 ? -1 : 1
  x = Math.abs(x)
  const t = 1 / (1 + p * x)
  const y = 1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x)
  return sign * y
}

function updateTrueSkill(ratingA, ratingB, aWon) {
  const beta = 200
  const tau = 0
  const drawMargin = 0

  const c = Math.sqrt(
    ratingA.sigma * ratingA.sigma +
      ratingB.sigma * ratingB.sigma +
      2 * beta * beta,
  )
  const t = (ratingA.mu - ratingB.mu) / c
  const sqrt2 = Math.sqrt(2)
  const sqrt2pi = Math.sqrt(2 * Math.PI)
  const expNegT2Half = Math.exp(-(t * t) / 2)
  const v =
    ((t > 0 ? 1 : -1) * expNegT2Half) /
    (sqrt2 * (0.5 + 0.5 * erf(t / sqrt2)))
  const w =
    1 /
    (c * c) *
    (expNegT2Half / (sqrt2pi * (0.5 + 0.5 * erf(t / sqrt2))) -
      t / (c * c))

  const newMuA = aWon
    ? ratingA.mu + (ratingA.sigma * ratingA.sigma) / c * v
    : ratingA.mu - (ratingA.sigma * ratingA.sigma) / c * v

  const newMuB = aWon
    ? ratingB.mu - (ratingB.sigma * ratingB.sigma) / c * v
    : ratingB.mu + (ratingB.sigma * ratingB.sigma) / c * v

  const newSigmaA = Math.sqrt(
    Math.max(
      0.0001,
      ratingA.sigma * ratingA.sigma - (ratingA.sigma * ratingA.sigma) ** 2 / (c * c) * w,
    ),
  )
  const newSigmaB = Math.sqrt(
    Math.max(
      0.0001,
      ratingB.sigma * ratingB.sigma - (ratingB.sigma * ratingB.sigma) ** 2 / (c * c) * w,
    ),
  )

  return {
    newRatingA: { mu: newMuA, sigma: newSigmaA },
    newRatingB: { mu: newMuB, sigma: newSigmaB },
  }
}

function getConfidenceInterval(rating, z = 1.96) {
  return {
    lower: rating.mu - z * rating.sigma,
    upper: rating.mu + z * rating.sigma,
  }
}

function calculateCompleteness(ratings) {
  const sorted = Object.values(ratings).sort((a, b) => b.mu - a.mu)
  if (sorted.length < 2) return 100
  const intervals = sorted.map((r) => getConfidenceInterval(r, 1.96))
  let totalOverlap = 0
  for (let i = 0; i < intervals.length - 1; i += 1) {
    const curr = intervals[i]
    const next = intervals[i + 1]
    const overlapStart = Math.max(curr.lower, next.lower)
    const overlapEnd = Math.min(curr.upper, next.upper)
    const overlap = Math.max(0, overlapEnd - overlapStart)
    totalOverlap += overlap
  }
  const maxPossibleOverlap = intervals[0].upper - intervals[intervals.length - 1].lower
  return maxPossibleOverlap > 0 ? Math.min(100, (totalOverlap / maxPossibleOverlap) * 100) : 100
}

function getBestOverlapPair(sortedAlbums, ratings) {
  let bestI = 0
  let bestJ = 1
  let bestOverlap = -1

  for (let i = 0; i < sortedAlbums.length; i += 1) {
    for (let j = i + 1; j < sortedAlbums.length; j += 1) {
      const ratingA = ratings[sortedAlbums[i].id]
      const ratingB = ratings[sortedAlbums[j].id]
      const intervalA = getConfidenceInterval(ratingA, 1.96)
      const intervalB = getConfidenceInterval(ratingB, 1.96)
      const overlap = Math.max(
        0,
        Math.min(intervalA.upper, intervalB.upper) - Math.max(intervalA.lower, intervalB.lower),
      )

      if (overlap > bestOverlap) {
        bestOverlap = overlap
        bestI = i
        bestJ = j
      }
    }
  }

  return { i: bestI, j: bestJ, overlap: bestOverlap }
}

function buildLiveRanked(albums, trueskill) {
  return [...albums].sort((a, b) => (trueskill[a.id].mu || 1000) - (trueskill[b.id].mu || 1000))
}

function buildInitialState(albums) {
  const initialPairs = buildInitialPairs(albums)
  const currentPair = initialPairs.length > 0 ? initialPairs[0] : null
  const expectedBinaryComparisons = getBinarySortExpectedComparisons(albums.length)
  return {
    phase: 'initial',
    initialPairs,
    initialPairIndex: 0,
    elo: initializeELO(albums),
    seen: {},
    binary: null,
    comparisons: 0,
    totalExpectedComparisons: initialPairs.length + expectedBinaryComparisons,
    completed: currentPair === null,
    swapSides: Math.random() < 0.5,
  }
}

export async function getStaticProps() {
  const imageDir = path.join(process.cwd(), 'public', 'images', 'projects', 'what-record-should-i-buy')
  const files = fs.readdirSync(imageDir).filter((file) => /\.(jpe?g|png)$/i.test(file))
  const albums = files
    .sort()
    .map((file) => {
      const { artist, album } = parseAlbumFile(file)
      return {
        artist,
        album,
        cover: `/images/projects/what-record-should-i-buy/${file}`,
        id: file,
      }
    })

  return {
    props: {
      albums,
    },
  }
}

export default function AlbumRanker({ albums }) {
  const [state, setState] = useState(() => buildInitialState(albums))
  const liveRanking = buildLiveRanked(albums, state.elo).filter((album) => state.seen[album.id])

  const initialPair = state.initialPairs[state.initialPairIndex] ?? null
  const currentPair = state.phase === 'initial'
    ? initialPair
    : state.phase === 'binary' && liveRanking.length >= 2 && state.binary.i !== undefined && state.binary.j !== undefined
      ? [liveRanking[state.binary.i], liveRanking[state.binary.j]]
      : null

  const percentComplete = Math.min(
    100,
    Math.round((state.comparisons / state.totalExpectedComparisons) * 100),
  )

  const seenRatings = {}
  for (const [id, rating] of Object.entries(state.elo)) {
    if (state.seen[id]) seenRatings[id] = rating
  }
  const completenessPercent = Math.round(calculateCompleteness(seenRatings))

  const rankedItems = []
  let lastScore = null
  let lastRank = 0
  liveRanking.forEach((item, index) => {
    const rating = state.elo[item.id]
    const score = Math.round(rating.mu)
    const rank = score === lastScore ? lastRank : index + 1
    rankedItems.push({ item, rating, rank })
    if (rank !== lastRank) {
      lastRank = rank
      lastScore = score
    }
  })

  const leftItem = currentPair ? (state.swapSides ? currentPair[1] : currentPair[0]) : null
  const rightItem = currentPair ? (state.swapSides ? currentPair[0] : currentPair[1]) : null
  const hasPair = !!currentPair && !state.completed && leftItem && rightItem && leftItem.id !== rightItem.id

  function chooseWinner(leftWins) {
    if (!hasPair || !leftItem || !rightItem || leftItem.id === rightItem.id) return

    const winner = leftWins ? leftItem : rightItem
    const loser = leftWins ? rightItem : leftItem

    setState((prev) => {
      const nextComparisons = prev.comparisons + 1
      const nextSwapSides = Math.random() < 0.5
      const nextElo = { ...prev.elo }
      const nextSeen = {
        ...prev.seen,
        [winner.id]: true,
        [loser.id]: true,
      }
      const { newRatingA, newRatingB } = updateTrueSkill(
        nextElo[winner.id],
        nextElo[loser.id],
        true,
      )
      nextElo[winner.id] = newRatingA
      nextElo[loser.id] = newRatingB

      if (prev.phase === 'initial') {
        const nextPairIndex = prev.initialPairIndex + 1
        if (nextPairIndex >= prev.initialPairs.length) {
          const currentRanking = buildLiveRanked(albums, nextElo).filter((a) => nextSeen[a.id])
          const binary = currentRanking.length >= 2
            ? getBestOverlapPair(currentRanking, nextElo)
            : { i: 0, j: 1, overlap: 0 }
          const completed = false

          return {
            phase: 'binary',
            initialPairs: prev.initialPairs,
            initialPairIndex: nextPairIndex,
            elo: nextElo,
            seen: nextSeen,
            binary,
            comparisons: nextComparisons,
            totalExpectedComparisons: prev.totalExpectedComparisons,
            completed,
            swapSides: nextSwapSides,
          }
        }

        return {
          ...prev,
          initialPairIndex: nextPairIndex,
          elo: nextElo,
          seen: nextSeen,
          comparisons: nextComparisons,
          completed: false,
          swapSides: nextSwapSides,
        }
      }

      if (prev.phase === 'binary') {
        const currentRanking = buildLiveRanked(albums, nextElo).filter((a) => nextSeen[a.id])
        const nextBinary = currentRanking.length >= 2
          ? getBestOverlapPair(currentRanking, nextElo)
          : { i: 0, j: 1, overlap: 0 }

        return {
          ...prev,
          elo: nextElo,
          seen: nextSeen,
          binary: nextBinary,
          comparisons: nextComparisons,
          completed: false,
          swapSides: nextSwapSides,
        }
      }

      return prev
    })
  }

  function restart() {
    setState(buildInitialState(albums))
  }

  const remainingCount = state.phase === 'initial'
    ? Math.max(0, state.initialPairs.length - state.initialPairIndex)
    : state.phase === 'binary' && liveRanking.length >= 2
      ? Math.floor(liveRanking.length / 2)
      : 0

  return (
    <Layout title="Album Ranker">
      <PageTitle>Album Ranker</PageTitle>

      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <div className={styles.statusBar}>
                <div>
                  <strong>Comparisons:</strong> {state.comparisons}
                </div>
                <div>
                  <strong>Ranked:</strong> {liveRanking.length}
                </div>
                <div>
                  <strong>Remaining:</strong> {remainingCount}
                </div>
                <div>
                  <strong>Progress:</strong> {percentComplete}%
                </div>
                <div>
                  <strong>Convergence:</strong> {completenessPercent}%
                </div>
                {state.comparisons > 0 && (
                  <a href="#" className={styles.resetLink} onClick={(event) => { event.preventDefault(); restart() }}>
                    Reset
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="columns">
            <div className="column">
              {state.completed ? (
                <div className={styles.finalizedBanner}>
                  <p>Ranking finalized.</p>
                  <button className="button is-primary" onClick={restart}>
                    Go again?
                  </button>
                </div>
              ) : (
                <div className={styles.instructionsBox}>
                  <p className={styles.instructions}>
                    Compare these two albums and choose the better cover art. The ranking will update as you work.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="container">
          <div className="columns is-variable is-8">
            <div className="column is-two-thirds">
              <div className="columns is-variable is-6 is-multiline">
                <div className="column">
                  <button
                    className={styles.choiceButton}
                    onClick={() => chooseWinner(true)}
                    aria-label={`Choose ${leftItem?.artist} - ${leftItem?.album}`}
                  >
                    <div className={styles.coverCard}>
                      <img className={styles.coverImage} src={leftItem?.cover} alt={leftItem?.album} />
                      <div className={styles.albumInfo}>
                        <strong>{leftItem?.artist}</strong>
                        <span>{leftItem?.album}</span>
                      </div>
                    </div>
                  </button>
                </div>
                <div className="column">
                  <button
                    className={styles.choiceButton}
                    onClick={() => chooseWinner(false)}
                    aria-label={`Choose ${rightItem?.artist} - ${rightItem?.album}`}
                  >
                    <div className={styles.coverCard}>
                      <img className={styles.coverImage} src={rightItem?.cover} alt={rightItem?.album} />
                      <div className={styles.albumInfo}>
                        <strong>{rightItem?.artist}</strong>
                        <span>{rightItem?.album}</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="column">
              <div className={styles.rankingPanel}>
                <h2 className="title is-4">Current ranking</h2>
                <ol className={styles.rankingList}>
                  {rankedItems.map(({ item, rating, rank }) => {
                    const ci = getConfidenceInterval(rating, 1.96)
                    const ciRange = Math.round(ci.upper - rating.mu)
                    return (
                      <li key={item.id} className={styles.rankingItem}>
                        <span className={styles.rankNumber}>#{rank}</span>
                        <span className={styles.eloScore}>
                          {Math.round(rating.mu)} <span className={styles.ciRange}>±{ciRange}</span>
                        </span>
                        <img className={styles.thumb} src={item.cover} alt={item.album} />
                        <div>
                          <strong>{item.artist}</strong>
                          <div>{item.album}</div>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
