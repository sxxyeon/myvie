import React from 'react'
import fetchFromApi from './../../../lib/api'
import requests from './../../../lib/requests'
import styles from '../../styles/home/banner.module.scss'
import Link from 'next/link';
const Banner = async () => {
  const movies = await fetchFromApi(requests.fetchNowPlaying)
  const randomMovie = movies.results[Math.floor(Math.random() * movies.results.length)]

  const imgUrl = `https://image.tmdb.org/t/p/`

  const truncate = (overview) => {
    const truncated =
      overview.length > 100 ? overview.slice(0, 99) + '...' : overview
    return truncated
  }
  return (
    <>
    <Link href={`/movie/${randomMovie.id}`}>
      <div
        className={styles.banner}
        style={{
          backgroundImage: `url(${imgUrl}/original/${randomMovie.backdrop_path})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          height: '700px',
        }}
      >
        <div className={styles.title_wrap}>
          <h2>{randomMovie.title || randomMovie.original_title}</h2>
          <div className={styles.overview}>
            {truncate(randomMovie.overview)}
          </div>
        </div>
      </div>
      </Link>
    </>
  )
}

export default Banner
