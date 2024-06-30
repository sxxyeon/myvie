// 'use client'
// import React, { createContext, useState, useEffect, useRef } from 'react'

// export const LoginContext = createContext()

// export const LoginProvider = ({ children }) => {
//   const [users, setUsers] = useState([])

//   useEffect(() => {
//     fetchData()
//   }, [])

//   const fetchData = async () => {
//     const resp = await fetch(`${process.env.NEXT_PUBLIC_JSON}/users`,  { 
//       method: 'GET',
//       cache: 'no-store',
//       credentials: 'include',
//       mode: 'cors',
//     });
//     const result = await resp.json()
//     setUsers(result)
//     //setIsDataChanged(true)
//   }

//   return (
//     <LoginContext.Provider value={{ users, fetchData  }}>
//       {children}
//     </LoginContext.Provider>
//   )
// }
