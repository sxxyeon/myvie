"use client"
import React, { createContext, useState, useContext, useEffect } from "react"

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/users`, {
      method: "GET",
      cache: "no-store",
    });
    const result = await resp.json();
    setUsers(result)
    //setIsDataChanged(true)
  };

  return (
    <LoginContext.Provider value={{ users, setUsers, fetchData }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(LoginContext)
  if (!context) {
    throw new Error("useUser must be used within a LoginProvider")
  }
  return context;
};
