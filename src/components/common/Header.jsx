"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../styles/common/header.module.scss";
import { useRouter } from "next/navigation";
import { useUser } from "../../context/LoginContext";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import Logo from "/public/img/logo.png";
import Profile from "/public/img/profile.png";
const Header = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const { users, fetchUserData } = useUser();

  const foundUser = users.find((item) => item.isLogin === true);

  const path = usePathname();

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (path !== "/search") {
      setSearch("");
    }
  }, [path]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  const onSearch = (e) => {
    const { value, name } = e.target;
    setSearch(e.target.value);
    router.push(`/search?q=${e.target.value}`);
  };

  return (
    <header
      className={`${styles.header} ${show ? styles.show : ""} ${
        path == "/" ? "" : styles.show
      }`}
    >
      <div className={styles.header_wrap}>
        <h1>
          <Link href="/">
            <Image src={Logo} alt="logo" height="25" />
          </Link>
        </h1>
        {path !== "/login" && (
          <div className={styles.right_header}>
            <div className={styles.input}>
              <input type="text" onChange={onSearch} value={search} />
              <FeatherIcon icon="search" size="30" stroke="#ddd" />
            </div>
            {foundUser ? (
              <>
                <Link href="/my">
                  <div className={styles.profile_state}>
                    <Image src={Profile} alt="profile" height="35" />
                  </div>
                </Link>
              </>
            ) : (
              <Link href="/login">
                <div className={styles.login_state}>LogIn</div>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
