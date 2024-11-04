"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import styles from "@/styles/common/topbutton.module.scss";

const TopButton = () => {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    show && (
      <button className={styles.top_btn} onClick={() => window.scrollTo(0, 0)}>
        <Icon icon="mdi:chevron-up" color="#fff" width="30" />
      </button>
    )
  );
};

export default TopButton;
