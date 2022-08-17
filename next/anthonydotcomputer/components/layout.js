import Header from './header'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children, home, title }) {
  return (
    <>
    {/* <Head>
      <title>Anthony W. Baker</title>
      <link rel="icon" href="/favicon-512x512.png" />
    </Head> */}
    <Header>{title}</Header>
    {home ? (
        <section className="section">a
          <div className="container">
            {children}
          </div>
        </section>
      ) : (
        <>
          <Navbar />
          <section className="section">
            <div className="container">
              {children}
            </div>
          </section>
          <Footer />
        </>
    )}
    </>
  );
}
