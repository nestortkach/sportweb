import React from "react"
import { builder, BuilderComponent, Builder } from "@builder.io/react"
import Link from "next/link"

import Container from '/components/atoms/Container'
import Arrow from '/components/atoms/Arrow'

import style from './GetStartedLink.module.scss'

const GetStartedLink = (props) => {

  return (
    <Link href={props.link || '/'}>
      <a className={`${style['getStartedLink']} getStartedLink`}>
        <Container size="wide">
          <div className={style.getStartedLink__inner}>
            <h2 className={style.getStartedLink__title}>{props.title}</h2>
            <span className={style.getStartedLink__button}>
              <span className={style['getStartedLink__button-text']}>{props.buttonText}</span>
              <Arrow className={style['getStartedLink__button-arrow']} />
            </span>
          </div>
        </Container>
      </a>
    </Link>
  )
}

Builder.registerComponent(GetStartedLink, {
  name: 'Get Started Link',
  inputs: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'link',
      type: 'url',
    },
    {
      name: 'buttonText',
      type: 'string',
    },
  ],
})