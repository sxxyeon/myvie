import React from 'react'
import fetchFromApi from './../../../lib/api'
import styles from '../../styles/detail/trailer.module.scss'
import Title from './../main/Title';

const Trailer = async ({ id }) => {
  const result = await fetchFromApi(`/movie/${id}/videos`)
  const videos = result.results
  return (
    videos.length !== 0 ? (
      <div className={styles.videos_container}>
        <Title title={'트레일러'}/>
        <div className={styles.videos_wrap}>
          <iframe
            src={`https://www.youtube.com/embed/` + videos[videos.length-1].key}
          ></iframe>
        </div>
      </div>
    ):null
  )
}

export default Trailer
