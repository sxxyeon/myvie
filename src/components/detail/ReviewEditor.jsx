'use client'
import React, { useState } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'
import styles from '../../styles/detail/review.module.scss'
import { useRouter } from 'next/navigation'

const ReviewEditor = ({ id }) => {
  const movieId = id
  const router = useRouter()
  const [reviewTxt, setReviewTxt] = useState('')
  const [nickName, setNickName] = useState('')

  //글자수 제한
  const charLimit = 100
  const charLeft = charLimit - reviewTxt.length

  const onChangeReview = (e) => {
    setReviewTxt(e.target.value)
  }
  const onChangeName = (e) => {
    setNickName(e.target.value)
  }

  const timeNow = new Date().toLocaleDateString()
  console.log(timeNow)
  const [score, setScore] = useState([false, false, false, false, false])
  const starScore = (index) => {
    const star = [] // 새로운 배열을 생성할 준비

    // score 배열을 순회하면서 각 요소를 평가하여 새로운 배열을 생성
    for (let i = 0; i < 5; i++) {
      star[i] = i <= index ? true : false // 인덱스가 index 이하인 경우 true, 그 외에는 false로 설정
    }
    setScore(star) // 새로운 배열을 score 상태로 설정
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const options = {
        cache: 'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId, timeNow, nickName, score, reviewTxt }),
        credentials: 'include',
        mode: 'cors',
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_JSON}/review`,
        options
      )
      if (!response.ok) {
        throw new Error('Failed to submit review.')
      }
      // 리뷰 등록 성공시
      //router.refresh();
      location.reload()
      //alert('리뷰가 등록되었습니다.')

      // 폼 초기화
      setReviewTxt('')
      setNickName('')
      setScore([false, false, false, false, false])
    } catch (error) {
      console.error('Error submitting review:', error)
    }
  }
  return (
    <div className={styles.review_editor}>
      <div className={`${styles.review} ${styles.editor}`}>
        <form onSubmit={handleSubmit}>
          <div className={styles.review_top}>
            <div className={styles.scores_wrap}>
              {score.map((item, index) => (
                <span key={index} onClick={() => starScore(index)}>
                  {item ? <FaStar color="white" /> : <FaRegStar color="#555" />}
                </span>
              ))}
            </div>
            <div className={styles.right_sec}>
              <span>name :</span>
              <input type="text" value={nickName} onChange={onChangeName} />
            </div>
          </div>
          <div className={styles.review_body}>
            <textarea
              maxLength="100"
              onChange={onChangeReview}
              value={reviewTxt}
            ></textarea>
            <span>
              {reviewTxt.length}/{charLimit} 자
            </span>
            <button className="btn btn01" type="submit">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReviewEditor
