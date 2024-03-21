import { builder, BuilderComponent, Builder } from '@builder.io/react'
import React from 'react'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'

import style from './TextOnly.module.scss'

const TextOnly = (props) => {

  let size = props.centered ? 'small' : 'wide'
  let position = props.centered ? 'center' : 'left'

	return (
    <Animate>
      <section className={`hero ${style['hero-text-only']} ${style['hero-text-only--' + position]}`}>
        <Container size={size}>
          <div className={style['hero-text-only__content']}>
            <h1 className={style['hero-text-only__title']}>{props.title}</h1>
            {props.subHeading && <h2 className={style['hero-text-only__subheading']}>{props.subHeading}</h2>}
            {props.description && <div className={`${style['hero-text-only__description']} margin-fix`} dangerouslySetInnerHTML={{__html: props.description}} />}
          </div>
        </Container>
      </section>
    </Animate>
  )
}

Builder.registerComponent(TextOnly, {
  name: 'Text Only',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Title',
      required: true,
    },
    {
      name: 'subHeading',
      type: 'string',
      defaultValue: 'Subheading',
    },
    {
      name: 'description',
      type: 'richText',
      defaultValue: 'Description',
    },
    {
      name: 'centered',
      type: 'boolean',
      defaultValue: false,
    },
  ],
})
