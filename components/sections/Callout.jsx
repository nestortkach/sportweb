import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import { getButtonProps, getSpacingProps } from '/utilities/inputs'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'
import Eyebrow from '../atoms/Eyebrow'
import ButtonRow from '../molecules/ButtonRow'
import Button from '../atoms/Button'

import style from './Callout.module.scss'

const Callout = (props) => {

	return (
    <section className={`component 
      ${style.callout}
      ${style['callout--theme-' + props.theme]}
      component--spc-t-${props.spacing?.top || 'standard'}
      component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Animate>
        <Container size="wide">
          {props.eyebrow && <Eyebrow text={props.eyebrow} className="animate" />}
          <h2 className={`${style.callout__heading} animate animate--fade-up`}>{props.heading}</h2>
          {props.content && (
            <div className={`${style.callout__content} margin-fix animate`} dangerouslySetInnerHTML={ { __html: props.content } }></div>
          )}
          {props.buttons?.length && (
            <ButtonRow alignment="left" style={{
              marginTop: 50
            }}
            className="animate">
              {props.buttons.map((button, index) => (
                <Button 
                  key={index}
                  type={button.type}
                  url={button.link?.url || '/'} 
                  target={button.link?.target || null}
                  color={button.color}>
                    {button.link?.title || null}
                </Button>
              ))}
            </ButtonRow>
            )}
        </Container>
      </Animate>
    </section>
  )
}

Builder.registerComponent(Callout, {
  name: "Callout",
  inputs: [
    {
      name: 'eyebrow',
      type: 'string',
    },
    {
      name: 'heading',
      type: 'string',
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'theme',
      type: 'string',
      enum: [
        'light',
        'dark',
      ],
      defaultValue: 'light',
    },
    {
      ...(getButtonProps()),
    },
    {
      ...(getSpacingProps()),
    },
  ]
})
