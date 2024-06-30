'use client'
import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import styles from '../../../../styles/auth/login.module.scss'
// import { LoginContext } from '../../../../context/LoginContext';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  //const { users } = useContext(LoginContext);

  const [input, setInput] = useState({
    userId: '',
    userPw: '',
  })
  
  const onChangeInput = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async(e) => {
    e.preventDefault()
    // users 배열이 비어있는지 확인

    // const foundUser = users.find(
    //   (item) => item.userId === input.userId && item.userPw === input.userPw
    // )
    // if (foundUser) {
    //   console.log('로그인 성공! 사용자 ID:', foundUser.id)

    //   const thisUser = {
    //     ...foundUser,
    //     isLogin:true
    //   }
    //   const options = {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(thisUser),
    //     credentials: "include",
    //     mode: 'cors',
    //   }
    //   const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/users/${foundUser.id}`, options)
    //   if (resp.ok) {
    //     const result = await resp.json()
    //     console.log(result) // 성공적으로 응답 받은 경우 처리
    //   } else {
    //     console.error('서버 오류:', resp.status) // 서버에서 오류가 발생한 경우 처리
    //   }
      router.push('/')

    // } else {
    // alert('일치하는 사용자를 찾을 수 없습니다.')
    //   // 사용자 인증 실패 처리
    // }

    
  }
  
  return (
    <div className={styles.login_container}>
      <h2>Logo</h2>
      <div className={styles.login_wrap}>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="아이디"
            value={input.userId}
            name="userId"
            onChange={onChangeInput}
          />
          <input
            type="password"
            placeholder="패스워드"
            value={input.userPw}
            name="userPw"
            onChange={onChangeInput}
          />
          <button type="submit" className="btn btn01">
            로그인
          </button>
        </form>
      </div>
      <div className={styles.auth_wrap}>
        <ul>
          <li>아이디 찾기</li>
          <li>비밀번호 찾기</li>
        </ul>
        <p>
          아직 계정이 없으신가요?{' '}
          <span>
            <Link href="/join1">회원가입하러 가기</Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login
