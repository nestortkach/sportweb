import React from "react"
import { builder, BuilderComponent, Builder } from "@builder.io/react"
import Image from "next/future/image"
import Link from "next/link"

import Arrow from "../atoms/Arrow"
import ArrowHolder from "../molecules/ArrowHolder"
import Container from "../atoms/Container"
import Animate from "../atoms/Animate"

import style from "./BigButton.module.scss"

const BigButton = (props) => {

  let nProps = []

  if(props.url === '/get-started') {
    nProps.url = '/[[...page]]?getStarted=1'
    nProps.as = '/get-started'
    nProps.shallow = true
  }

  return (
    <Animate>
      <div className={`component
        component--spc-t-none
        component--spc-b-none
        ${style['bigButton']}`}
        >
        <div className={style.bigButton__background}>
          {props.background && (
            <Image
              src={props.background}
              fill
              className={style['bigButton__background-image']}
              />
            )}
        </div>
        <Link 
          href={nProps?.url || props.url || '/'} 
          as={nProps?.as || null} 
          scroll={nProps?.url ? false : true} 
          shallow={nProps?.shallow || false}>
          <a className={style.bigButton__link}>
            <Container size="small">
              <div className={`${style['bigButton__link-content']} animate animate--fade-up`}>
                <span className={style['bigButton__link-text']}>{props.title || null}</span>
                <ArrowHolder 
                  className={style['bigButton__link-arrow']}
                  direction="forward">
                  <Arrow />
                </ArrowHolder>
              </div>
            </Container>
          </a>
        </Link>
      </div>
    </Animate>
  )
}

Builder.registerComponent(BigButton, {
  name: "Big Button",
  inputs: [
    {
      name: 'background',
      type: 'file',
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'url',
      type: 'url',
    },
  ],
})
