import Header from './header'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children, home, hideFooter, title, canonicalHref, noindex }) {

  return (
    <>
    <Header canonicalHref={canonicalHref} noindex={noindex}>{title}</Header>
    {home ? <></> : <Navbar />}
    <section className="section">
      <div className="container">
        {children}
      </div>
    </section>
    {hideFooter ? <></> : (home ? <Footer home /> : <Footer />)}
    </>
  );
}
