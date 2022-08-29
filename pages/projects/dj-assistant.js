import Layout from '../../components/layout'
import Project from '../../components/project'
import P from '../../components/paragraph'
import SongTitle from '../../components/songTitle'
import React from 'react'

import styles from './dj-assistant.module.css'

import { getAirtableData } from '../../utils/djAssistant'

import projectImage from '../../public/images/projects/black_square.png'

export const frontmatter = {
  title: 'DJ Assistant',
  description: 'Song recommendations for obscure situations.',
  slug: 'dj-assistant',
  preview: projectImage,
  themeColor: '#000', // '#f5f403',
  updatedAt: '2022-08-28',
  completed: true,
}

export async function getStaticProps() {
    const songData = await getAirtableData();
    return {
      props: {
        songData,
      },
    };
}

export default function SongsForPeople({ songData }) {
    const [selectedSong, setSong] = React.useState();

    function handleFormChange(event) {
        const song = songData.find((song) => song.Description == event.target.value)
        // console.log(song)
        setSong(song)
            
    }

    return (
        <Layout title={frontmatter.title}>
            <section className="section">
                <P style={{fontWeight: 'bold', textAlign: 'left'}}>DJ Assistant</P>
                <P style={{textAlign: 'left'}}>Not sure what song to queue up next? Choose the option below that best describes the situation or people you are playing music for.</P>
                <div className="field">
                    {/* <label className="label">Subject</label> */}
                    <div className="control">
                        <div className="select">
                            <select onChange={handleFormChange}>
                                <option className={styles.options}>Select an option</option>
                                {songData.map((song) => (
                                    <option className={styles.options}>{song.Description}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            {selectedSong ? (
                <>
                <section className="section">
                    <SongTitle subtitle={`by ${selectedSong.Artist}`}>{selectedSong.Title}</SongTitle>
                </section>    
                <section className="section">
                    <div className={`container ${styles.playerContainer}`} dangerouslySetInnerHTML={{ __html:  selectedSong.AppleMusicEmbed}} />
                    <div className={`container ${styles.playerContainer}`} dangerouslySetInnerHTML={{ __html:  selectedSong.SpotifyEmbed}} />
                    {/* <div className={`container ${styles.playerContainer}`}>
                        <div dangerouslySetInnerHTML={{ __html:  selectedSong.AppleMusicEmbed}} />
                    </div> 
                    <div className={`container ${styles.playerContainer}`}>
                        <div dangerouslySetInnerHTML={{ __html:  selectedSong.SpotifyEmbed}} />
                    </div>*/}
                </section>
                </>
            ) : (<></>)}
        </Layout>
    )
}