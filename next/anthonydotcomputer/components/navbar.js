import { css } from '@emotion/react'
import styles from './navbar.module.css'
import Anchor from './anchor'
import Back from './back'

export default function Navbar () {
  return(
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Anchor href="/" className={styles.logo}>ANTHONY W. BAKER</Anchor>
        <Back className={styles.logo} />
      </div>
    </nav>
  );
}
