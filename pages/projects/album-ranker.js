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

function buildInitialState(albums) {
  const deck = shuffle([...albums])
  const first = deck.shift()
  const candidate = deck.shift() ?? null
  return {
    ranked: first ? [first] : [],
    remaining: deck,
    candidate,
    low: 0,
    high: first ? 0 : -1,
    target: first ? 0 : -1,
    comparisons: 0,
    completed: candidate === null,
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

  const currentOpponent = state.ranked[state.target]
  const currentCandidate = state.candidate

  const hasPair = currentOpponent && currentCandidate && !state.completed

  function chooseWinner(winnerIsCandidate) {
    if (!currentOpponent || !currentCandidate) return

    setState((prev) => {
      const nextComparisons = prev.comparisons + 1
      const nextLow = winnerIsCandidate ? prev.target + 1 : prev.low
      const nextHigh = winnerIsCandidate ? prev.high : prev.target - 1

      if (nextLow > nextHigh) {
        const insertionIndex = nextLow
        const nextRanked = [
          ...prev.ranked.slice(0, insertionIndex),
          prev.candidate,
          ...prev.ranked.slice(insertionIndex),
        ]

        if (prev.remaining.length === 0) {
          return {
            ranked: nextRanked,
            remaining: [],
            candidate: null,
            low: 0,
            high: nextRanked.length - 1,
            target: -1,
            comparisons: nextComparisons,
            completed: true,
          }
        }

        const nextCandidate = prev.remaining[0]
        const nextRemaining = prev.remaining.slice(1)
        const nextLow2 = 0
        const nextHigh2 = nextRanked.length - 1
        return {
          ranked: nextRanked,
          remaining: nextRemaining,
          candidate: nextCandidate,
          low: nextLow2,
          high: nextHigh2,
          target: randomInt(nextLow2, nextHigh2),
          comparisons: nextComparisons,
          completed: false,
        }
      }

      return {
        ...prev,
        low: nextLow,
        high: nextHigh,
        target: randomInt(nextLow, nextHigh),
        comparisons: nextComparisons,
      }
    })
  }

  function restart() {
    setState(buildInitialState(albums))
  }

  return (
    <Layout title="Album Ranker">
      <PageTitle>Album Ranker</PageTitle>

      <section className="section">
        <div className="container">
          <div className="columns is-variable is-8">
            <div className="column is-two-thirds">
              <div className={styles.statusBar}>
                <div>
                  <strong>Comparisons:</strong> {state.comparisons}
                </div>
                <div>
                  <strong>Ranked:</strong> {state.ranked.length}
                </div>
                <div>
                  <strong>Remaining:</strong> {state.remaining.length + (state.candidate ? 1 : 0)}
                </div>
              </div>

              {state.completed ? (
                <div className={styles.finalizedBanner}>
                  <p>Ranking finalized.</p>
                  <button className="button is-primary" onClick={restart}>
                    Go again?
                  </button>
                </div>
              ) : (
                <>
                  <p className={styles.instructions}>
                    Compare these two albums and choose the better cover art. The ranking will update as you work.
                  </p>

                  <div className="columns is-variable is-6">
                    <div className="column">
                      <button
                        className={`button is-fullwidth ${styles.choiceButton}`}
                        onClick={() => chooseWinner(false)}
                      >
                        <div className={styles.coverCard}>
                          <img className={styles.coverImage} src={currentOpponent?.cover} alt={currentOpponent?.album} />
                          <div className={styles.albumInfo}>
                            <strong>{currentOpponent?.artist}</strong>
                            <span>{currentOpponent?.album}</span>
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="column">
                      <button
                        className={`button is-fullwidth ${styles.choiceButton}`}
                        onClick={() => chooseWinner(true)}
                      >
                        <div className={styles.coverCard}>
                          <img className={styles.coverImage} src={currentCandidate?.cover} alt={currentCandidate?.album} />
                          <div className={styles.albumInfo}>
                            <strong>{currentCandidate?.artist}</strong>
                            <span>{currentCandidate?.album}</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}
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
