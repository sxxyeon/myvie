"use client";
import Link from "next/link";
import React from "react";
import styles from "@/styles/home/category.module.scss";
const Category = () => {
  const onMoveSec = (index) => {
    const targetElement = document.querySelector(`#r${index}`);
    if (targetElement) {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offset = 200;
      window.scrollTo({
        top: targetPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const category = [
    "높은 평점 영화",
    "오늘의 트렌드 영화",
    "인기 영화",
    "개봉 예정 영화",
    "호러 영화",
  ];
  return (
    <div className={styles.category_wrap}>
      <ul>
        {category.map((item, index) => (
          <li key={index} onClick={() => onMoveSec(index + 2)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
