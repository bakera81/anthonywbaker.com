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
  const elo = {}
  for (const album of albums) {
    elo[album.id] = 1000
  }
  return elo
}

function calculateNewELO(ratingA, ratingB, aWon) {
  const K = 32
  const expectedA = 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400))
  const expectedB = 1 / (1 + Math.pow(10, (ratingA - ratingB) / 400))
  const resultA = aWon ? 1 : 0
  const resultB = aWon ? 0 : 1
  return {
    newRatingA: ratingA + K * (resultA - expectedA),
    newRatingB: ratingB + K * (resultB - expectedB),
  }
}

function buildLiveRanked(albums, elo) {
  return [...albums].sort((a, b) => (elo[b.id] || 1000) - (elo[a.id] || 1000))
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
    : state.phase === 'binary' && liveRanking.length >= 2
      ? [liveRanking[state.binary.currentIndex], liveRanking[state.binary.currentIndex + 1]]
      : null

  const percentComplete = Math.min(
    100,
    Math.round((state.comparisons / state.totalExpectedComparisons) * 100),
  )

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
      const { newRatingA, newRatingB } = calculateNewELO(
        nextElo[winner.id],
        nextElo[loser.id],
        true,
      )
      nextElo[winner.id] = newRatingA
      nextElo[loser.id] = newRatingB

      if (prev.phase === 'initial') {
        const nextPairIndex = prev.initialPairIndex + 1
        if (nextPairIndex >= prev.initialPairs.length) {
          const binary = {
            currentIndex: 0,
          }
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
          ? {
              currentIndex: randomInt(0, currentRanking.length - 2),
            }
          : {
              currentIndex: 0,
            }

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
                  <strong>Complete:</strong> {percentComplete}%
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
                  {liveRanking.map((item, index) => (
                    <li key={item.id} className={styles.rankingItem}>
                      <span className={styles.rankNumber}>{index + 1}</span>
                      <span className={styles.eloScore}>({Math.round(state.elo[item.id])})</span>
                      <img className={styles.thumb} src={item.cover} alt={item.album} />
                      <div>
                        <strong>{item.artist}</strong>
                        <div>{item.album}</div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
