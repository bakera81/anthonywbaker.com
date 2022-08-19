import A from './anchor'
import Back from './back'

import styles from './navbar.module.css'

export default function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <A href="/" className={`navbar-item ${styles.logo}`}>Anthony W. Baker</A>
        <Back className={`navbar-item ${styles.logo}`} />
      </div>
    </nav>
  );
}
