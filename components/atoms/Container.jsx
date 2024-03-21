import React from 'react'

const Container = ({ size, children }) => {

	return (
    <div className={`container container--${size}`}>
      {children}
    </div>
  )
}

export default Container
