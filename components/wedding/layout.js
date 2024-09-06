import Header from './header'

export default function Layout({ children, title }) {

  return (
    <>
    <Header dataTheme='dark'>{title}</Header>
    {/* <section className="section" style={{padding: 0}}>
      <div className="container" style={{margin: 0}}> */}
        {children}
      {/* </div>
    </section> */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap" rel="stylesheet" />
    </>
  );
}
