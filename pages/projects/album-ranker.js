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

function buildInitialRanked(albums, scores) {
  return [...albums].sort((a, b) => {
    const scoreA = scores[a.id] || 0
    const scoreB = scores[b.id] || 0
    if (scoreB !== scoreA) return scoreB - scoreA
    return a.id.localeCompare(b.id)
  })
}

function pickRandomRefineIndex(rankings) {
  if (rankings.length < 2) return -1
  return randomInt(0, rankings.length - 2)
}

function buildInitialState(albums) {
  const unplayed = shuffle([...albums])
  const currentPair = pickRandomInitialPair(unplayed, albums)
  return {
    phase: 'initial',
    unplayed,
    scores: {},
    currentPair,
    currentPairIndex: -1,
    ranked: [],
    checkedPairs: [],
    comparisons: 0,
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

  const currentPair = state.phase === 'initial'
    ? state.currentPair
    : state.currentPairIndex >= 0 && state.ranked.length > 1
      ? [state.ranked[state.currentPairIndex], state.ranked[state.currentPairIndex + 1]]
      : null

  const leftItem = currentPair ? (state.swapSides ? currentPair[1] : currentPair[0]) : null
  const rightItem = currentPair ? (state.swapSides ? currentPair[0] : currentPair[1]) : null
  const hasPair = !!currentPair && !state.completed

  function chooseWinner(leftWins) {
    if (!hasPair || !leftItem || !rightItem) return

    const winner = leftWins ? leftItem : rightItem
    const loser = leftWins ? rightItem : leftItem

    setState((prev) => {
      const nextComparisons = prev.comparisons + 1
      const nextSwapSides = Math.random() < 0.5

      if (prev.phase === 'initial') {
        const nextScores = { ...prev.scores }
        nextScores[winner.id] = (nextScores[winner.id] || 0) + 1
        if (!(loser.id in nextScores)) nextScores[loser.id] = 0

        const nextUnplayed = prev.unplayed.filter((item) => item.id !== winner.id && item.id !== loser.id)
        const nextPair = pickRandomInitialPair(nextUnplayed, albums)

        if (nextUnplayed.length === 0) {
          const nextRanked = buildInitialRanked(albums, nextScores)
          const nextCheckedPairs = nextRanked.length > 1 ? Array(nextRanked.length - 1).fill(false) : []
          const nextIndex = pickRandomRefineIndex(nextRanked)
          const completed = nextRanked.length < 2

          return {
            phase: 'refine',
            unplayed: nextUnplayed,
            scores: nextScores,
            currentPair: null,
            currentPairIndex: nextIndex,
            ranked: nextRanked,
            checkedPairs: nextCheckedPairs,
            comparisons: nextComparisons,
            completed,
            swapSides: nextSwapSides,
          }
        }

        return {
          ...prev,
          unplayed: nextUnplayed,
          scores: nextScores,
          currentPair: nextPair,
          comparisons: nextComparisons,
          completed: nextPair === null,
          swapSides: nextSwapSides,
        }
      }

      const nextRanked = [...prev.ranked]
      const currentIndex = prev.currentPairIndex
      const higher = nextRanked[currentIndex]
      const lower = nextRanked[currentIndex + 1]
      const nextCheckedPairs = [...prev.checkedPairs]
      let completed = false

      if (winner.id === higher.id) {
        nextCheckedPairs[currentIndex] = true
        completed = nextCheckedPairs.every(Boolean)
      } else {
        nextRanked[currentIndex] = lower
        nextRanked[currentIndex + 1] = higher
        for (let i = 0; i < nextCheckedPairs.length; i += 1) nextCheckedPairs[i] = false
      }

      const nextIndex = completed ? -1 : pickRandomRefineIndex(nextRanked)
      return {
        ...prev,
        ranked: nextRanked,
        checkedPairs: nextCheckedPairs,
        currentPairIndex: nextIndex,
        comparisons: nextComparisons,
        completed,
        swapSides: nextSwapSides,
      }
    })
  }

  function restart() {
    setState(buildInitialState(albums))
  }

  const remainingCount = state.phase === 'initial' ? state.unplayed.length : state.checkedPairs.filter(Boolean).length

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
                  <strong>Ranked:</strong> {state.phase === 'refine' ? state.ranked.length : 0}
                </div>
                <div>
                  <strong>Remaining:</strong> {remainingCount}
                </div>
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
                  {state.ranked.map((item, index) => (
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
