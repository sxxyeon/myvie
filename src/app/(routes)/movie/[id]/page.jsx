import React, { Suspense } from 'react'
import Banner from '../../../../components/detail/Banner'
import Actors from './../../../../components/detail/Actors'
import Trailer from './../../../../components/detail/Trailer'
import Similar from './../../../../components/detail/Similar'
import Reviews from './../../../../components/detail/Reviews'

const page = async ({ params }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Banner id={params.id} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Actors id={params.id} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Trailer id={params.id} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Similar id={params.id} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Reviews id={params.id} />
      </Suspense>
    </div>
  )
}

export default page
