'use client'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Icon } from '@iconify/react'
import styles from '../../styles/modal/modal.module.scss'
import Link from 'next/link'
const Modal = ({ movie, setIsModalOpen }) => {

  const [liked, setLiked] = useState(false)
  const [likedList, setLikedList] = useState([])
  const isMobile = useMediaQuery({ maxWidth: 700 })

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    if (movie && movie.id) {
      fetchData(movie.id)
    }
    return () => {
      document.body.style.overflowY = 'scroll'
    }
  }, [movie.id])

  const fetchData = async (id) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/liked`, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      mode: 'cors',
    })
    const json = await resp.json()
    setLikedList(json)
    const likedInit = json.some((item) => String(item.id) === String(id))
    setLiked(likedInit)

  }
  const truncate = (overview) => {
    const truncated =
      overview.length > 100 ? overview.slice(0, 99) + '...' : overview
    return truncated
  }
  const handleLike = async (id) => {
    if (liked) {
      // 이미 찜한 상태일 때는 찜 목록에서 삭제
      const options = {
        method: 'DELETE',
        credentials: 'include',
        mode: 'cors',
      }
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_JSON}/liked/${parseInt(id)}`,
        options
      )
      if (!resp.ok) {
        throw new Error('Failed to remove from liked list.')
      }
      alert('찜 목록에서 삭제되었습니다.')
      setLiked(false)
    } else {
      // 찜 목록에 추가

      // 찜 목록에 추가하기 전에 중복 확인
      const isAlreadyLiked = likedList.some((item) => item.id === id)
      if (isAlreadyLiked) {
        alert('이미 찜 목록에 있습니다.')
        return
      }
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: String(id) }),
        credentials: 'include',
        mode: 'cors',
      }
      const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/liked`, options)
      if (!resp.ok) {
        throw new Error('Failed to add to liked list.')
      }
      alert('찜 목록에 추가되었습니다.')
      setLiked(true)
    }
  }
  const imgUrl = `https://image.tmdb.org/t/p/`
  return (
    movie && (
      <div className="presentation" role="presentation">
        <div className={styles.wrapper_modal}>
          <div className={styles.modal}>
            <button
              className={styles.close_btn}
              onClick={() => setIsModalOpen(false)}
            >
              <Icon icon="mdi:close" color="#fff" width="50" />
            </button>
            <img
              src={`${imgUrl}/original/${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className={styles.modal_content}>
              <h2 className={styles.modal_title}>
                {movie.title ? movie.title : name}
              </h2>
              
              <ul>
                <li>{movie.adult ? '19' : '15'}</li>
                <li>{movie.release_date?.slice(0, 4)}</li>
                <li>{Math.floor(movie.vote_average)}점대</li>
              </ul>

              <p className={styles.modal_overview}>
                {truncate(movie.overview)}
              </p>
            </div>
            <div className={styles.btn_box}>
              <button onClick={() => handleLike(movie.id)}>
                {liked ? (
                  <Icon icon="mdi:cards-heart" color="#FE153C" width="30" />
                ) : (
                  <Icon
                    icon="mdi:cards-heart-outline"
                    color="#FE153C"
                    width="30"
                  />
                )}
                {isMobile ? '' : '찜하기'}
              </button>

              <Link href={`/movie/${movie.id}`}>
                <button className="btn btn01">자세히 보기</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default Modal
