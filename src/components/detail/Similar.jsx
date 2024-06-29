import React from 'react'
import Row from './../main/Row';
import fetchFromApi from './../../../lib/api';
import requests from './../../../lib/requests';
const Similar = async ({id}) => {
    const resp = await fetchFromApi(`/movie/${id}/similar`)
  const similar = resp.results
  return (
    similar.length > 0 &&
    <Row title={'비슷한 영화'} id={'similar'} fetchUrl={`/movie/${id}/similar`} isBig/>
    
  )
}

export default Similar