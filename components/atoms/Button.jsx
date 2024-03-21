import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Arrow from './Arrow'

const Button = (props) => {

  let color = props.color || 'black'
  let nProps = []

  if(props.url === '/get-started') {
    nProps.url = '/[[...page]]?getStarted=1'
    nProps.as = '/get-started'
    nProps.shallow = true
  }

	return (
    <>
      {props.url && (
        <Link 
          href={nProps?.url || props.url} 
          as={nProps?.as || props.as} 
          target={props.target}
          scroll={nProps?.url ? false : true} 
          shallow={nProps?.shallow || false}
          passHref>
          <a
            className={`button button--${props.type} button--${props.type}--${color}`}
            onClick={props.onClick}
            target={props.target}>
            {props.type === 'back' && <Arrow className="button__arrow button__arrow--reverse" />}
            {props.children}
            {props.icon && <FontAwesomeIcon icon={props.icon} className="button__icon" />}
            {props.type === 'filled' && <Arrow className="button__arrow" />}
          </a>
      </Link>
      ) || (
        <button
          className={`button button--${props.type} button--${props.type}--${color}`}
          onClick={props.onClick}
          >
          {props.type === 'back' && <Arrow className="button__arrow button__arrow--reverse" />}
          {props.children}
          {props.icon && <FontAwesomeIcon icon={props.icon} className="button__icon" />}
          {props.type === 'filled' && <Arrow className="button__arrow" />}
        </button>
      )}
    </>
    
  )
}

export default Button
