import React from 'react'
import { Icon } from '@iconify/react'
const AgreeChk = ({ id, checked, onChange, required, title }) => {
  return (
    <li>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />

      <label htmlFor={id}>
        {checked ? (
          <Icon icon="mdi:check-circle" color={'#FE153C'} width={20}/>
        ) : (
          <Icon icon="mdi:check-circle-outline" color={'#FE153C'} width={20}/>
        )}
      </label>
      <span>{title}</span>
    </li>
  )
}

export default React.memo(AgreeChk)
