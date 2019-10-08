import React from 'react'
import './Bubble.css'

export default props => {
  const color = props.user ? 'cyan' : 'white'
  return (
    <span
      style={{
        padding: 4,
        color,
      }}
    >
      {props.by}: {props.content}
    </span>
  )
}
