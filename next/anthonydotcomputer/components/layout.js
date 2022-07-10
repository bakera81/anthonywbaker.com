import Navbar from './navbar'
import Footer from './footer'

const renderFooter = props => {
  if (props.hideFooter) {
    return
  }
  return (
    <Footer hideNav={props.hideNav} />
  )
}

const renderNav = props => {
  if (props.hideName) {
    return
  }
  return <NavBar />
}

export default function Layout({ children, home }) {
  return (
    <>
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
