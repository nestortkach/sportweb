import React from 'react'
import Script from 'next/script'

const Loader = (props) => {
  
  return (
    <div className="loader">
      <div className="loader__spinner">
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
        <lottie-player 
          src="https://assets9.lottiefiles.com/datafiles/w8kbBwzPRk7sTCe/data.json"  
          background="transparent"  
          speed="1"  
          style={{ 
            width: 80,
            height: 80 
          }}
          loop  
          autoplay>
          </lottie-player>
      </div>
    </div>
  )
}

export default Loader