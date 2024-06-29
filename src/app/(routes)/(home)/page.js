import Image from 'next/image'
import Banner from './../../../components/main/Banner'
import Row from '../../../components/main/Row'
import SlideRow from '../../../components/main/SlideRow'
import requests from '../../../../lib/requests'
export default function Home() {
  return (
    <main>
      <Banner />
      <SlideRow
        title={'지금 상영중'}
        id={'r1'}
        isBig
        fetchUrl={requests.fetchNowPlaying}
      />
      <Row
        title={'Top rated'}
        id={'r2'}
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        title={'오늘의 Trend'}
        id={'r3'}
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title={'인기 영화'}
        id={'r4'}
        fetchUrl={requests.fetchPopular}
      />
      <Row
        title={'개봉예정 영화'}
        id={'r5'}
        fetchUrl={requests.fetchUpcoming}
      />
      <Row
        title={'호러 영화'}
        id={'r6'}
        fetchUrl={requests.fetchHorrorMovies}
      />
    </main>
  )
}
