'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import RowItem from './../main/RowItem'
import styles from '../../styles/my/liked.module.scss'

const Liked = ({ movies }) => {
  const router = useRouter()
  const deleteMovie = async (movie) => {
    const options = {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
    }
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_JSON}/liked/${movie.id}`,
      options
    )
    location.reload()
  }
  const imgUrl = `https://image.tmdb.org/t/p/`
  return movies.length > 0 ? (
    <div className={styles.liked}>
      {movies.map((movie) => {
        return (
          <div
            id={movie.id}
            className={styles.row_item}
            key={movie.id}
            onClick={() => router.push(`/movie/${movie.id}`)}
          >
            <button
              className={styles.close_btn}
              onClick={() => deleteMovie(movie)}
            >
              <Icon icon="mdi:close" color="#fff" width="24" />
            </button>
            <img src={`${imgUrl}w500/${movie.poster_path}`} alt="poster" />
          </div>
        )
      })}
    </div>
  ) : (
    <div className={styles.no_liked}>찜한 내역이 없습니다.</div>
  )
}

export default Liked
