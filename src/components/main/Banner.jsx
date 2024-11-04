"use client";
import React, { useEffect, useState } from "react";
import fetchFromApi from "./../../../lib/api";
import requests from "./../../../lib/requests";
import styles from "../../styles/home/banner.module.scss";
import Link from "next/link";
import { Pagination, Autoplay, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const resp = await fetchFromApi(requests.fetchNowPlaying);
    setBanner(resp.results);
    //const randomMovie = movies.results[Math.floor(Math.random() * movies.results.length)];
  };

  const imgUrl = `https://image.tmdb.org/t/p/`;

  const truncate = (overview) => {
    const truncated =
      overview.length > 60 ? overview.slice(0, 59) + "..." : overview;
    return truncated;
  };
  return (
    <div className={styles.banner_wrap}>
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        centeredSlides="true"
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false, // 사용자 상호작용 시 자동 재생 비활성화
        }}
        effect="fade"
        fadeEffect={{
          crossFade: true, // 교차 페이드 효과
        }}
        speed={1000}
        pagination={{
          clickable: true, // 클릭 가능하게 설정
        }}
      >
        {banner.map((movie) => (
          <SwiperSlide key={movie.id}>
            {" "}
            <Link href={`/movie/${movie.id}`}>
              <div
                className={styles.banner}
                style={{
                  backgroundImage: `url(${imgUrl}/original/${movie.backdrop_path})`,
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  height: "700px",
                }}
              >
                <div className={styles.title_wrap}>
                  <h2>{movie.title || movie.original_title}</h2>
                  <div className={styles.overview}>
                    {truncate(movie.overview)}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
