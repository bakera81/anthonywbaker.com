import Header from '../components/header'
import Layout from  '../components/layout'
import PageTitle from  '../components/pagetitle'
import P from '../components/paragraph'

export default function Contact() {
    return (
        <>
            <Header>Contact</Header>
            <Layout>
            <PageTitle>Contact</PageTitle>
            <P><b>Electronic-mail:</b> anthonywbaker1[at]gmail.com</P>
            <P><b>LinkedIn:</b> <a href="https://www.linkedin.com/in/awbaker1/" target="_blank" rel="noopener">linkedin.com/in/awbaker1/</a></P>
            <P><b>Github:</b>  <a href="https://github.com/bakera81" target="_blank" rel="noopener">github.com/bakera81</a></P>
            <P><b>Twitter:</b> <a href="https://twitter.com/AddieBundren81" target="_blank" rel="noopener">twitter.com/AddieBundren81</a></P>
            </Layout>
        </>
    )
}