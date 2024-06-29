'use client'
import React, { useState, useEffect, Suspense } from 'react'
import fetchFromApi from './../../../../lib/api'
import { useSearchParams, useRouter } from 'next/navigation'
import RowItem from './../../../components/main/RowItem'
import styles from '../../../styles/search/search.module.scss'
import useDebounce from './../../../hooks/useDebounce'
const Search = () => {
  const params = useSearchParams()
  const [movies, setMovies] = useState([])
  const router = useRouter()

  const searchTerm = params.get('q')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchData(debouncedSearchTerm)
    } else {
    }
  }, [debouncedSearchTerm])

  const fetchData = async (searchTerm) => {
    try {
      const resp = await fetchFromApi(`/search/multi?query=${searchTerm}`)
      const movies = resp.results.filter(
        (result) => result.media_type === 'movie'
      )
      setMovies(movies)
    } catch (error) {
      console.log('error')
    }
  }
  const onClickMovie = (movie) => {
    try {
      router.push(`/movie/${movie.id}`)
    } catch (error) {
      console.log('해당 영화의 상세 정보를 불러올 수 없습니다.')
    }
  }
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {searchTerm.length > 0 ? (
          movies.length > 0 ? (
            <div className={styles.search}>
              {movies.map((movie) => (
                <RowItem
                  key={movie.id}
                  movie={movie}
                  onClick={onClickMovie}
                  isBig
                />
              ))}
            </div>
          ) : (
            <div className={styles.no_result}>
              &quot;{searchTerm}&ldquo; 의 검색결과가 없습니다.
            </div>
          )
        ) : (
          <div className={styles.no_result}>검색어를 입력해 주세요.</div>
        )}
      </Suspense>
    </>
  )
}

export default Search
