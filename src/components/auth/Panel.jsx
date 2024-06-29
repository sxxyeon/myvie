import React from 'react'
import styles from '../../styles/auth/join.module.scss'
const Panel = ({ content, notice }) => {
  return (
    <div className={styles.panel}>
      <ul>{content}</ul>
      { notice? (<p>{notice}</p>):(null)}
    </div>
  )
}

export default React.memo(Panel)
