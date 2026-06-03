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
  let total = 0
  for (let i = 1; i < count; i += 1) {
    total += Math.floor(Math.log2(i + 1)) + 1
  }
  return total
}

function buildLiveRanked(albums, scores, order, seen) {
  return [...albums]
    .filter((album) => seen[album.id])
    .sort((a, b) => {
      const scoreA = scores[a.id] || 0
      const scoreB = scores[b.id] || 0
      if (scoreB !== scoreA) return scoreB - scoreA
      return (order[a.id] ?? 0) - (order[b.id] ?? 0)
    })
}

function isValidPair(pair) {
  return Array.isArray(pair)
    && pair.length === 2
    && pair[0]
    && pair[1]
    && pair[0].id !== pair[1].id
}

function createBinaryState(initialRanking) {
  if (initialRanking.length < 2) {
    return {
      sorted: initialRanking,
      candidate: null,
      target: null,
      currentIndex: 0,
    }
  }
  const currentIndex = randomInt(0, initialRanking.length - 2)
  return {
    sorted: initialRanking,
    candidate: initialRanking[currentIndex],
    target: initialRanking[currentIndex + 1],
    currentIndex,
  }
}

function advanceBinaryState(binary) {
  if (binary.sorted.length < 2) {
    return {
      ...binary,
      candidate: null,
      target: null,
    }
  }
  const currentIndex = randomInt(0, binary.sorted.length - 2)
  return {
    sorted: binary.sorted,
    candidate: binary.sorted[currentIndex],
    target: binary.sorted[currentIndex + 1],
    currentIndex,
  }
}

function buildInitialState(albums) {
  const initialPairs = buildInitialPairs(albums)
  const currentPair = initialPairs.length > 0 ? initialPairs[0] : null
  const expectedBinaryComparisons = getBinarySortExpectedComparisons(albums.length)
  return {
    phase: 'initial',
    initialPairs,
    initialPairIndex: 0,
    scores: {},
    seen: {},
    binary: null,
    ranked: [],
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
  const originalOrder = Object.fromEntries(albums.map((album, index) => [album.id, index]))
  const liveRanking = buildLiveRanked(albums, state.scores, originalOrder, state.seen)

  const initialPair = state.initialPairs[state.initialPairIndex] ?? null
  const currentPair = state.phase === 'initial'
    ? isValidPair(initialPair) ? initialPair : null
    : state.phase === 'binary' && state.binary && state.binary.candidate
      ? isValidPair([state.binary.candidate, state.binary.target])
        ? [state.binary.candidate, state.binary.target]
        : null
      : null

  const percentComplete = Math.min(
    100,
    Math.round((state.comparisons / state.totalExpectedComparisons) * 100),
  )

  const leftItem = currentPair ? (state.swapSides ? currentPair[1] : currentPair[0]) : null
  const rightItem = currentPair ? (state.swapSides ? currentPair[0] : currentPair[1]) : null
  const hasPair = !!currentPair && !state.completed

  function chooseWinner(leftWins) {
    if (!hasPair || !leftItem || !rightItem || leftItem.id === rightItem.id) return

    const winner = leftWins ? leftItem : rightItem
    const loser = leftWins ? rightItem : leftItem

    setState((prev) => {
      const nextComparisons = prev.comparisons + 1
      const nextSwapSides = Math.random() < 0.5

      if (prev.phase === 'initial') {
        const nextScores = { ...prev.scores }
        nextScores[winner.id] = (nextScores[winner.id] || 0) + 1
        if (!(loser.id in nextScores)) nextScores[loser.id] = 0

        const nextSeen = {
          ...prev.seen,
          [winner.id]: true,
          [loser.id]: true,
        }

        const nextPairIndex = prev.initialPairIndex + 1
        if (nextPairIndex >= prev.initialPairs.length) {
          const initialRanking = buildLiveRanked(albums, nextScores, originalOrder, nextSeen)
          const binary = createBinaryState(initialRanking)
          const completed = !binary.candidate

          return {
            phase: 'binary',
            initialPairs: prev.initialPairs,
            initialPairIndex: nextPairIndex,
            scores: nextScores,
            seen: nextSeen,
            binary,
            ranked: [],
            comparisons: nextComparisons,
            totalExpectedComparisons: prev.totalExpectedComparisons,
            completed,
            swapSides: nextSwapSides,
          }
        }

        return {
          ...prev,
          initialPairs: prev.initialPairs,
          initialPairIndex: nextPairIndex,
          scores: nextScores,
          seen: nextSeen,
          comparisons: nextComparisons,
          completed: false,
          swapSides: nextSwapSides,
        }
      }

      const nextScores = { ...prev.scores }
      nextScores[winner.id] = (nextScores[winner.id] || 0) + 1
      if (!(loser.id in nextScores)) nextScores[loser.id] = 0

      const nextBinary = advanceBinaryState(prev.binary)
      const completed = !nextBinary.candidate

      return {
        ...prev,
        scores: nextScores,
        binary: nextBinary,
        comparisons: nextComparisons,
        completed,
        swapSides: nextSwapSides,
      }
    })
  }

  function restart() {
    setState(buildInitialState(albums))
  }

  const remainingCount = state.phase === 'initial'
    ? Math.max(0, state.initialPairs.length - state.initialPairIndex)
    : state.binary && state.binary.candidate
      ? Math.floor(state.binary.sorted.length / 2)
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
