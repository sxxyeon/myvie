'use client'
import React, { useState,useCallback } from 'react'
import Link from 'next/link'
import styles from '../../../../../styles/auth/join.module.scss'
import { useRouter } from 'next/navigation'
import Panel from './../../../../../components/auth/Panel'
import AgreeChk from './../../../../../components/auth/AgreeChk'
const Join1 = () => {
  const router = useRouter()
  const [input, setInput] = useState({
    userId: '',
    userPw: '',
    userPwChk: '',
    userEmail: '',
  })
  const [isInput, setIsInput] = useState({
    userIdIs: false,
    userPwIs: false,
    userPwChkIs: false,
    userEmailIs: false,
  })

  const [inputMsg, setInputMsg] = useState({
    userIdMsg: '',
    userPwMsg: '',
    userPwChkMsg: '',
    userEmailMsg: '',
  })

  const validationRules = {
    userId: {
      regex: /^[a-zA-Z0-9]{4,12}$/,
      message: '4-12 사이 대소문자 또는 숫자만 입력해 주세요',
    },
    userPw: {
      regex: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/,
      message: '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요',
    },
    userPwChk: {
      validate: (value) => value === input.userPw,
      message: '패스워드가 일치하지 않습니다.',
    },
    userEmail: {
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '유효한 이메일 주소를 입력해주세요.',
    },
  }

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }))
    const rule = validationRules[name]
    console.log(rule)
    if (rule) {
      let isValid = true
      if (rule.regex) {
        isValid = rule.regex.test(value)
        console.log(isValid)
      } else if (rule.validate) {
        isValid = rule.validate(value)
      }
      setIsInput((prev) => ({ ...prev, [`${name}Is`]: isValid }))
      console.log(isInput)
      setInputMsg((prev) => ({ ...prev, [`${name}Msg`]: isValid ? '' : rule.message }))
      console.log(inputMsg)
    }
  }


  const handleJoin = async (e) => {
    e.preventDefault()
    const { userId, userPw, userEmail } = input

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        userPw,
        userEmail,
        isLogin: false,
      }),
    }
    const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/users`, options)
    alert('가입이 완료되었습니다.')
    router.push('/login')
  }

  // 약관 동의

  const [allAgreed, setAllAgreed] = useState(false)
  const [agreements, setAgreements] = useState({
    serviceAgrd: false,
    personalAgrd: false,
  })
  // 필수동의 체크 여부 확인
  const isValid = agreements.serviceAgrd && agreements.personalAgrd

  const handleAgreementChange = useCallback((e) => {
    const { name, checked } = e.target
    setAgreements((prevAgreements) => ({
      ...prevAgreements,
      [name]: checked,
    }))
    const allChecked = Object.values({
      ...agreements,
      [name]: checked,
    }).every((value) => value === true)
    setAllAgreed(allChecked)
  },[])

  const handleAllAgreementChange = useCallback((e) => {
    const { checked } = e.target
    setAgreements((prevAgreements) =>
      Object.keys(prevAgreements).reduce(
        (newAgreements, agreementsKey) => ({
          ...newAgreements,
          [agreementsKey]: checked,
        }),
        {}
      )
    )
    setAllAgreed(checked)
  },[])

  return (
    <div className={styles.join_container}>
      <h2>
        Logo <span>회원가입</span>
      </h2>
      <div className={styles.join_wrap}>
        <form onSubmit={handleJoin}>
          <input
            type="text"
            name="userId"
            value={input.userId}
            onChange={onChangeInput}
            placeholder="아이디"
          />
          <p className={styles.msg}>{inputMsg.userIdMsg}</p>
          <input
            type="password"
            name="userPw"
            value={input.userPw}
            onChange={onChangeInput}
            placeholder="패스워드"
          />
          <p className={styles.msg}>{inputMsg.userPwMsg}</p>
          <input
            type="password"
            name="userPwChk"
            value={input.userPwChk}
            onChange={onChangeInput}
            placeholder="패스워드 확인"
          />
          <p className={styles.msg}>{inputMsg.userPwChkMsg}</p>
          <input
            type="text"
            name="userEmail"
            value={input.userEmail}
            onChange={onChangeInput}
            placeholder="이메일"
          />
          <p className={styles.msg}>{inputMsg.userEmailMsg}</p>
          <div className={styles.agree_wrap}>
            <Panel
              content={
                <>
                  <AgreeChk
                    id={'agrdAll'}
                    checked={allAgreed}
                    onChange={handleAllAgreementChange}
                    title={'필수 이용동의 및 선택 이용동의에 모두 동의합니다'}
                  />
                  <AgreeChk
                    id={'serviceAgrd'}
                    required
                    checked={agreements.serviceAgrd}
                    onChange={handleAgreementChange}
                    title={'서비스 이용약관 동의'}
                  />
                  <AgreeChk
                    id={'personalAgrd'}
                    required
                    checked={agreements.personalAgrd}
                    onChange={handleAgreementChange}
                    title={'개인정보 수집 및 이용동의'}
                  />
                </>
              }
            />
          </div>
          <button type="submit" className="btn btn01">
            가입하기
          </button>
        </form>
      </div>
    </div>
  )
}

export default Join1
