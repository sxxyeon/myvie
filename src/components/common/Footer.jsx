import React from 'react'
import Link from 'next/link'
import styles from '../../styles/common/footer.module.scss'
import Image from 'next/image'
import Logo from '/public/img/logo.png'
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_top}>
        <h1><Image src={Logo} alt="logo" height="20" /></h1>
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
