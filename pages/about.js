import Layout from '../components/layout'
import A from '../components/anchor'
import PageTitle from  '../components/pagetitle'
import P from '../components/paragraph'
import Hr from '../components/hr'
import shuffle from '../utils/shuffle'
import Link from 'next/link'

import React from 'react'

import styles from './about.module.css'

export default function About() {

  const aboutMeInit = [
    "Product manager. ", "Data scientist. ", "Entrepreneur. ", "Designer. ", "Growth marketer. ", "Educator. ", "Coffee addict. ", "Music lover. "
  ];

  const [aboutMe, setShuffled] = React.useState(aboutMeInit);

  function shuffleOnClick() {
    const newAboutMe = shuffle([...aboutMe])
    setShuffled(newAboutMe.map(item => (item + " ")))
  }

  return (
    <Layout title="About">
      <PageTitle>Anthony W. Baker</PageTitle>
        <P>{aboutMe} <span className={styles.shuffleSpan}>[<a onClick={shuffleOnClick}>shuffle</a>]</span></P>
        <P>I've spent the past decade becoming the best product manager I can be, working at the intersection of data, education, and AI. 
          <br />
          I'm on a mission to become a modern-day Renaissance Man.
        </P>
        <P>
          <Link href="mailto:anthonywbaker1@gmail.com">Send me an email. | </Link>
           <Link href="/projects/this-site">About this site. | </Link> 
           <Link href="/skills">My skills.</Link>
        </P>
        <Hr />
        <P>Product @ <A href="https://workera.ai" target="_blank">Workera</A>: 2023-2025</P>
        <P>Product @ <A href="https://heap.io" target="_blank">Heap</A>: 2022-2023</P>
        <P>Product, data science, and growth @ <A href="https://www.datacamp.com" target="_blank">DataCamp</A>: 2016-2022.</P>
        <P>Technology, innovation, and education (master's) @ <A href="https://www.gse.harvard.edu/masters/tie" target="_blank">Harvard Graduate School of Education</A>: 2015-2016.</P>
        <P>Creative writing & computer science (bachelor's) @ <A href="https://www.lafayette.edu/" target="_blank">Lafayette College</A>: 2011-2015.</P>
        <P><a href="/BakerResume_v20.pdf" target="_blank"  rel="noopener noreferrer">Resume</a></P>
        <Hr />
        <P><A href="/contact">Contact</A></P>
    </Layout>
  );
}
