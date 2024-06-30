'use client'
import React, { useState, useEffect } from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'
import styles from '../../styles/detail/review.module.scss'
import ReviewEditor from './ReviewEditor'
import Title from './../main/Title'
import { Icon } from '@iconify/react'
const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([])
  const itemsPage = 3
  const [visibleItems, setvisibleItems] = useState(itemsPage)

  const loadMoreItems = () => {
    setvisibleItems((prev) => prev + itemsPage)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/review`, { 
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      mode: 'cors',
    });
    const result = await resp.json()
    setReviews(result)
  }

  const filteredReviews = reviews.filter((review) => review.movieId === id)
  console.log(filteredReviews.length)
  return (
    <>
      <div className={styles.reviews_container}>
        <Title title={'관람평'} />

        {filteredReviews.length > 0 ? (
          <>
            {filteredReviews.slice(0, visibleItems).map((review) => (
              <div key={review.id} className={styles.review}>
                <div className={styles.review_top}>
                  <div className={styles.scores_wrap}>
                    {review.score.map((item, index) => (
                      <span key={index}>
                        {item ? (
                          <FaStar color="white" />
                        ) : (
                          <FaRegStar color="#555" />
                        )}
                      </span>
                    ))}
                  </div>
                  <div className={styles.right_sec}>
                    <div>{review.nickName}</div>
                    <div>{review.timeNow}</div>
                  </div>
                </div>
                <div className={styles.review_body}>{review.reviewTxt}</div>
              </div>
            ))}
            {visibleItems < filteredReviews.length && (
              <div className={styles.more_btn} >
              <button onClick={loadMoreItems}>
                <Icon icon="mdi:chevron-down" color="#fff" width="60" />
              </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.no_review}>
            {' '}
            등록된 리뷰가 없습니다. 첫번째 작성자가 되어보세요.
          </div>
        )}

        <ReviewEditor id={id} />
      </div>
    </>
  )
}

export default Reviews
