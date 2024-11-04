"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import fetchFromApi from "./../../../lib/api";
import Link from "next/link";
import SwiperCore from "swiper";
import styles from "../../styles/home/row.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const SlideRow = ({ title, id, fetchUrl }) => {
  const [movies, setMovies] = useState([]);

  const imgUrl = `https://image.tmdb.org/t/p/`;

  const fetchData = useCallback(async () => {
    const resp = await fetchFromApi(fetchUrl);
    setMovies(resp.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className={`${styles.row} ${styles.big} ${styles.slide}`}>
      <h2>{title}</h2>
      <Swiper
        className={styles.row_wrap}
        modules={[Autoplay]}
        breakpoints={{
          1024: {
            slidesPerView: 5, // 한번에 보이는 슬라이드 갯수
            slidesPerGroup: 5, // 몇개씩 슬라이드 할지
          },
          650: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성
        }}
      >
        {movies.map((movie) => {
          return (
            <SwiperSlide key={movie.id} className={styles.slide_item}>
              <Link href={`/movie/${movie.id}`}>
                <img src={`${imgUrl}w500/${movie.poster_path}`} alt="poster" />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SlideRow;
