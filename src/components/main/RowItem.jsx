"use client";
import React from "react";
import styles from "../../styles/home/row.module.scss";
const RowItem = ({ movie, onClick, isBig }) => {
  const imgUrl = `https://image.tmdb.org/t/p/`;
  return (
    movie.poster_path &&
    movie.backdrop_path && (
      <div
        id={movie.id}
        className={styles.row_item}
        key={movie.id}
        onClick={() => onClick(movie)}
      >
        <img
          src={`${imgUrl}w500/${
            isBig ? movie.poster_path : movie.backdrop_path
          }`}
          alt="poster"
        />
      </div>
    )
  );
};

export default RowItem;
