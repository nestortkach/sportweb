import { builder, BuilderComponent, Builder } from '@builder.io/react'
import React from 'react'
import Image from 'next/future/image'
import Head from 'next/head'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'

import style from './Short.module.scss'

const Short = (props) => {

	return (
    <Animate>
      <Head>
        {/* <!-- Preload the hero image --> */}
        <link rel="preload" href={props.background} as="image" />
      </Head>
      <section className={`hero ${style['hero-short']}`}>
        <div className={style['hero-short__image']}>
          <Image 
            src={props.background}
            style={{
              objectFit: 'cover',
            }}
            priority
            fill />
        </div>
        <div className={style['hero-short__content']}>
          <Container size="small">
            <h1 className={`${style['hero-short__title']} ${props.content && style['hero-short__title--nudge']} animate animate--fade-up`}>{props.heading}</h1>
          </Container>
        </div>
        {props.content && (
          <Container size="wide">
            <div className={`${style['hero-short__text-wrap']} animate animate--fade-up`}>
              <div className={`${style['hero-short__text']} ${style['hero-short__text--' + props.fontSize]} margin-fix`} dangerouslySetInnerHTML={ { __html: props.content } } />
            </div>
          </Container>
        )}
      </section>
    </Animate>
  )
}

Builder.registerComponent(Short, {
  name: "Short",
  inputs: [
    {
      name: 'heading',
      type: 'string',
      },
      {
        name: 'background',
        type: 'file',
      },
      {
        name: 'content',
        type: 'richText',
      },
      {
        name: 'fontSize',
        type: 'string',
        enum: ['normal', 'large'],
        defaultValue: 'normal',
      },
  ],
})