'use client'
import React from 'react'
import { Icon } from '@iconify/react'
import styles from '../../styles/common/arrow.module.scss'
const Arrow = ({ id }) => {
  const moveHandler = (direction) => {
    const container = document.getElementById(id)
    if (direction === 'next') {
      container.scrollLeft += window.innerWidth - 80
    } else {
      container.scrollLeft -= window.innerWidth - 80
    }
  }
  return (
    <div className={styles.arrow_wrap}>
      <div
        className={`${styles.prev} ${styles.arrow}`}
        onClick={() => {
          moveHandler('prev')
        }}
      >
        <Icon icon="mdi:chevron-left" color="#fff" width="60" />
      </div>
      <div
        className={`${styles.next} ${styles.arrow}`}
        onClick={() => {
          moveHandler('next')
        }}
      >
        <Icon icon="mdi:chevron-right" color="#fff" width="60" />
      </div>
    </div>
  )
}

export default Arrow
