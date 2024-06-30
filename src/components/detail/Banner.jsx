'use client'
import fetchFromApi from './../../../lib/api'
import requests from './../../../lib/requests'
import styles from '../../styles/detail/banner.module.scss'
import { Icon } from '@iconify/react'
import Button from './../common/Button'
import { useState, useEffect } from 'react'
const Banner = ({ id }) => {
  const [movie, setMovie] = useState({})
  const [liked, setLiked] = useState(false)
  const [likedList, setLikedList] = useState([]) // 찜 목록 상태 추가

  useEffect(() => {
    fetchData(id)
  }, [])
  const fetchData = async (id) => {
    const resp = await fetchFromApi(`/movie/${id}`)
    setMovie(resp)
    const resp2 = await fetch(`${process.env.NEXT_PUBLIC_JSON}/liked`, {
      method: 'GET',
      cache: 'no-store',
      credentials: 'include',
      mode: 'cors',
    })
    const json = await resp2.json()
    setLikedList(json)
    const likedInit = json.some((item) => item.id === id)
    setLiked(likedInit)
  }
  const imgUrl = `https://image.tmdb.org/t/p/`

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

  const truncate = (overview) => {
    const truncated =
      overview.length > 300 ? overview.slice(0, 299) + '...' : overview
    return truncated
  }

  if (!movie || !movie.title) {
    return null // 또는 로딩 스피너 등을 반환할 수 있음
  }

  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${imgUrl}/original/${movie.backdrop_path})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <div className={styles.banner_wrap}>
        <div className={styles.banner_poster}>
          <img src={`${imgUrl}/w500/${movie.poster_path}`} alt="" />
        </div>
        <div className={styles.banner_info}>
          <h2>{movie.title}</h2>
          <ul>
            <li>{movie.adult ? '19' : '15'}</li>
            <li>{movie.release_date?.slice(0, 4)}</li>
            <li>{movie.genres[1]?.name}</li>
            <li>{movie.runtime}분</li>
            <li>{Math.floor(movie.vote_average)}점대</li>
          </ul>
          <button className="btn" onClick={() => handleLike(id)}>
            {liked ? (
              <Icon icon="mdi:cards-heart" color="#FE153C" width="30" />
            ) : (
              <Icon icon="mdi:cards-heart-outline" color="#FE153C" width="30" />
            )}
            찜하기
          </button>
          <p>{truncate(movie.overview)}</p>
        </div>
      </div>
    </div>
  )
}

export default Banner
