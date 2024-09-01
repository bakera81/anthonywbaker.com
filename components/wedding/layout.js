import Header from './header'

export default function Layout({ children, title }) {

  return (
    <>
    <Header>{title}</Header>
    <section className="section" style={{padding: 0}}>
      <div className="container" style={{margin: 0}}>
        {children}
      </div>
    </section>
    </>
  );
}
