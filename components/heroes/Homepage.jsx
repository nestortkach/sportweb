import { builder, BuilderComponent, Builder } from '@builder.io/react'
import React from 'react'
import Image from 'next/future/image'
import Head from 'next/head'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'
import ButtonRow from '../molecules/ButtonRow'
import Button from '../atoms/Button'

import style from './Homepage.module.scss'

import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

const Homepage = (props) => {

	return (
    <Animate>
      <Head>
        {/* <!-- Preload the hero image --> */}
        <link rel="preload" href={props.background} as="image" />
      </Head>
      <section className={`hero ${style['hero-homepage']}`}>
        <div className={style['hero-homepage__image']}>
          <Image 
            src={props.background}
            priority
            fill />
        </div>
        <div className={style['hero-homepage__content']}>
          <Container size="small">
            <h1 className={`${style['hero-homepage__title']} animate animate--fade-up`}>{props.heading}</h1>
            {props.buttons?.length && (
            <ButtonRow alignment="center" className="animate">
              {props.buttons.map((button, index) => (
                <Button 
                  key={index}
                  type={button.type}
                  url={button.link?.url || '/'} 
                  target={button.link?.target || null}
                  icon={button.type === 'underlined' && solid('chevron-right')}
                  color={button.color}>
                    {button.link?.title || null}
                </Button>
              ))}
            </ButtonRow>
            )}
          </Container>
        </div>
      </section>
    </Animate>
  )
}

Builder.registerComponent(Homepage, {
  name: "Homepage",
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
      name: 'buttons',
      type: 'list',
      subFields: [
        {
          name: 'link',
          type: 'object',
          subFields: [
            {
              name: 'title',
              type: 'string',
              defaultValue: 'Button',
            },
            {
              name: 'url',
              type: 'url',
              defaultValue: '/button',
            },
            {
              name: 'target',
              type: 'string',
              defaultValue: '_self',
              enum: [
                {
                  label: 'Same Window',
                  value: '_self',
                },
                {
                  label: 'New Window',
                  value: '_blank',
                }
              ]
            }
          ]
        },
        {
          name: 'type',
          type: 'string',
          defaultValue: 'filled',
          enum: [
            {
              label: 'Filled',
              value: 'filled',
            },
            {
              label: 'Underlined',
              value: 'underlined',
            },
          ]
        },
        {
          name: 'color',
          type: 'string',
          defaultValue: 'white',
          enum: [
            {
              label: 'Black',
              value: 'black',
            },
            {
              label: 'White',
              value: 'white',
            },
            {
              label: 'Yellow',
              value: 'yellow',
            }
          ]
        }
      ]
    }
  ]
})




