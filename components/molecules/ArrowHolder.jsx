import React from "react"

import Arrow from "../atoms/Arrow"

import style from "./ArrowHolder.module.scss"

const ArrowHolder = (props) => {
  
  return (
    <div className={`
      ${style['arrowHolder']} 
      ${props.className || ''} 
      ${props.direction === 'forward' ? style['arrowHolder--forward'] : ''}
      `}>
      <svg
        width="52px"
        height="74px"
        viewBox="0 0 52 74"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className={style['arrowHolder__triangle']}
      >
        <title>{"arrow-triangle-white"}</title>
        <g
          id="arrow-triangle-white"
          stroke="none"
          strokeWidth={1}
          fill="none"
          fillRule="evenodd"
          fillOpacity={0.2}
          className={style['arrowHolder__fill']}
        >
          <polygon
            id="Triangle"
            stroke="#FFFFFF"
            fill="#FFFFFF"
            transform="translate(26.000000, 36.500000) rotate(-90.000000) translate(-26.000000, -36.500000) "
            points="26 11 63 62 -11 62"
          />
        </g>
      </svg>
      <Arrow className={style.arrowHolder__arrow} />
    </div>
  )
}

export default ArrowHolder