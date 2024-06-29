import React from 'react'
import Link from 'next/link'
import styles from '../../styles/common/footer.module.scss'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        <h1>logo</h1>
        <ul>
          <li>
            <Link href={'/'}>개인정보처리방침</Link>
          </li>
          <li>
            <Link href={'/'}>이용약관</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footer_bottom}>
        <p>SY all rights resolved.</p>
      </div>
    </footer>
  )
}

export default Footer
