import Header from './header'
import Navbar from './navbar'
import Footer from './footer'

export default function Layout({ children, home, hideFooter, title }) {

  return (
    <>
    <Header>{title}</Header>
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
