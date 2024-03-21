import React from 'react'

const Eyebrow = ( props ) => {

	return (
    <span className={`eyebrow ${props.className || ''}`}>{props.text}</span>
  )
}

export default Eyebrow
