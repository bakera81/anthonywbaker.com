import Layout from '../components/layout'
import A from '../components/anchor'
import PageTitle from  '../components/pagetitle'
import P from '../components/paragraph'
import Hr from '../components/hr'
import shuffle from '../utils/shuffle'


import React from 'react'

import styles from './about.module.css'
// import resume from "../public/BakerResume_v18_Heap.pdf"



// class AboutMe extends React.Component {

// // constructor to set state and bind "this"
//       constructor(props) {
//           super(props);
//           this.items = aboutMe;
//           this.handleClick = this.handleClick.bind(this);
//         }

//       // function to handle the click
//        handleClick() {
//         this.setState({
//           items: shuffle(aboutMe)
//         });
//       }

//       render() {
//         return(
//           <P>{this.items.map(item => (item + " "))} <span css={{fontSize: `.7em`}}>[<a onClick={this.handleClick}>shuffle</a>]</span></P>
//         )
//       }
// }

export default function About() {

  const aboutMeInit = [
    "Product manager. ", "Data scientist. ", "Designer. ", "Growth marketer. ", "Educator. ", "Process enthusiast. ", "Coffee addict. ", "Music lover. "
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
        <Hr />
        <P>Product @ <A href="https://workera.ai" target="_blank">Workera</A>: 2023-present</P>
        <P>Product @ <A href="https://heap.io" target="_blank">Heap</A>: 2022-2023</P>
        <P>Product, data science, and growth @ <A href="https://www.datacamp.com" target="_blank">DataCamp</A>: 2016-2022.</P>
        <P>Technology, innovation, and education (master's) @ <A href="https://www.gse.harvard.edu/masters/tie" target="_blank">Harvard Graduate School of Education</A>: 2015-2016.</P>
        <P>Creative writing & computer science (bachelor's) @ <A href="https://www.lafayette.edu/" target="_blank">Lafayette College</A>: 2011-2015.</P>
        <P><a href="/BakerResume_v19.3_data.pdf" target="_blank"  rel="noopener noreferrer">Resume</a></P>
        <Hr />
        <P><A href="/contact">Contact</A></P>
    </Layout>
  );
}
