import React from 'react'

const ButtonRow = (props) => {

	return (
    <div {...props} className={`button-row button-row--${props.alignment} ${props.className}`}>
      {props.children}
    </div>
  )
}

export default ButtonRow
