import { css } from '@emotion/react'
import styles from './navbar.module.css'
import A from './anchor'
import Back from './back'

export default function Navbar () {
  return(
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <A href="/" className={styles.logo}>ANTHONY W. BAKER</A>
        <Back className={styles.logo} />
      </div>
    </nav>
  );
}
