"use client";
import React from "react";
import styles from "../../styles/my/liked.module.scss";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./../../context/LoginContext";
import Image from "next/image";
import profile from "/public/img/profile.png";

const Profile = () => {
  const router = useRouter();
  const { users, fetchUserData } = useUser();

  const foundUser = users.find((item) => item.isLogin === true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogOut = async () => {
    const thisUser = {
      ...foundUser,
      isLogin: false,
    };
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(thisUser),
      cache: "no-store",
    };
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_JSON}/musers/${foundUser.id}`,
      options
    );
    const result = await resp.json();
    await fetchUserData();
    router.push("/login");
  };
  return (
    <div className={styles.profile_container}>
      <div className={styles.profile_wrap}>
        <div className={styles.left_sec}>
          <div className={styles.thum}>
            <Image src={profile} alt="profile" height="130" />
          </div>
          <p>
            <span>{foundUser?.userId}</span> 님
          </p>
        </div>
        <div className={styles.right_sec}>
          <div className={styles.setting}>
            <button className="btn btn03" onClick={handleLogOut}>
              logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
