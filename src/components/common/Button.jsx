'use client'
import React from 'react'

const Button = ({ id, text, onClick, children }) => {
  return (
    <button onClick={()=>onClick(id)}>
      {children}
      {text}
    </button>
  )
}

export default Button
