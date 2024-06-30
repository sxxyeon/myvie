import React from 'react'
import fetchFromApi from './../../../../lib/api'
import Profile from './../../../components/my/Profile'
import Liked from './../../../components/my/Liked'

const MyPage = async () => {
  
  // liked 목록 가져오기
  const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/liked`, { 
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
    mode: 'cors',
  });
  const likedList = await resp.json()

  // 각 liked 항목에 대해 movie 정보 가져오기
  const moviesPromises = likedList.map( async(item) => {
    const movieResp = await fetchFromApi(`/movie/${item.id}`)
    return movieResp
  })

  // 모든 영화 정보를 가져올 때까지 기다림
  const movies = await Promise.all(moviesPromises)
  return (
    <>
      <Profile />
      <Liked movies={movies} />
    </>
  )
}

export default MyPage
