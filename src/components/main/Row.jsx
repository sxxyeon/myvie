'use client'
import React, { useEffect, useState, useCallback } from 'react'
import fetchFromApi from './../../../lib/api'
import styles from '../../styles/home/row.module.scss'
import Modal from './../modal/Modal'
import Arrow from './../common/Arrow'
import RowItem from './RowItem'

const Row = ({ title, id, fetchUrl, isBig }) => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchData = useCallback(async () => {
    const resp = await fetchFromApi(fetchUrl)
    const result = resp.results
    setMovies(result)
  }, [fetchUrl])

  useEffect(() => {
    fetchData()
  }, [])

  const onClickMovie = (movie) => {
    if (setSelectedMovie(movie) !== null) {
      setIsModalOpen(true)
    }
  }
  const imgUrl = `https://image.tmdb.org/t/p/`

  return (
    <>
      <div className={`${styles.row} ${isBig ? styles.big : ''}`}>
        <h2>{title}</h2>
        <div id={id} className={styles.row_wrap}>
          {movies.map((movie) => {
            return (
              <RowItem
                key={movie.id}
                movie={movie}
                onClick={onClickMovie}
                isBig={isBig}
              />
            )
          })}
        </div>
        <Arrow id={id} />
      </div>
      {isModalOpen && <Modal movie={selectedMovie} setIsModalOpen={setIsModalOpen} />}
    </>
  )
}

export default Row
