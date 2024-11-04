import Image from "next/image";
import Banner from "./../../../components/main/Banner";
import Row from "../../../components/main/Row";
import SlideRow from "../../../components/main/SlideRow";
import requests from "../../../../lib/requests";
import Category from "@/components/main/Category";
export default function Home() {
  return (
    <main>
      <Banner />
      <SlideRow
        title={"지금 상영중"}
        id={"r1"}
        isBig
        fetchUrl={requests.fetchNowPlaying}
      />
      <Category />
      <Row
        title={"높은 평점 작품"}
        id={"r2"}
        isBig
        fetchUrl={requests.fetchTopRated}
      />
      <Row
        title={"오늘의 트렌드"}
        id={"r3"}
        isBig
        fetchUrl={requests.fetchTrending}
      />
      <Row
        title={"인기 영화"}
        id={"r4"}
        isBig
        fetchUrl={requests.fetchPopular}
      />
      <Row
        title={"개봉예정 영화"}
        id={"r5"}
        isBig
        fetchUrl={requests.fetchUpcoming}
      />
      <Row
        title={"호러 영화"}
        id={"r6"}
        isBig
        fetchUrl={requests.fetchHorrorMovies}
      />
    </main>
  );
}
