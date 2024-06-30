'use client'
import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../../styles/common/header.module.scss'
import { useRouter } from 'next/navigation'
// import { LoginContext } from './../../context/LoginContext'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import Logo from '/public/img/logo2.png'
import Profile from '/public/img/profile.png'
const Header = () => {
  const router = useRouter()
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')

  // const { users, fetchData } = useContext(LoginContext)
  const [foundUser, setFoundUser] = useState(false) //
  
  useEffect(() => {
    //const user = users.find((item) => item.isLogin === true)
    //setFoundUser(user)
    //fetchData()
    if(path !== '/search'){
      setSearch('')
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        setShow(true)
      } else {
        setShow(false)
      }
    })
  }, [])
  const path = usePathname()

  const onSearch = (e) => {
    const { value, name } = e.target
    setSearch(e.target.value)
    router.push(`/search?q=${e.target.value}`)
  }

  
  return (
    <header
      className={`${styles.header} ${show ? styles.show : ''} ${
        path == '/' ? '' : styles.show
      }`}
    >
      <div className={styles.header_wrap}>
        <h1>
          <Link href="/">
            <Image src={Logo} alt="logo" height="35"/>
          </Link>
        </h1>
        {path !== '/login' && 
        <div className={styles.right_header}>
          <input type="text" onChange={onSearch} value={search} />
          {foundUser ? (
            <>
              <Link href="/my">
              <div className={styles.profile_state}><Image src={Profile} alt="profile" height="50"/></div>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <div className={styles.login_state}>LogIn</div>
            </Link>
          )}
        </div>}
      </div>
    </header>
  )
}

export default Header
