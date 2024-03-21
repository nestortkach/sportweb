import React from "react"
import { Builder } from "@builder.io/react"
import { getButtonProps, getSpacingProps } from '/utilities/inputs'
import Image from 'next/future/image'

import Container from '../atoms/Container'
import Eyebrow from '../atoms/Eyebrow'
import Animate from '../atoms/Animate'
import ButtonRow from '../molecules/ButtonRow'
import Button from '../atoms/Button'

import style from './CTA.module.scss'

const CTA = (props) => {


  return (
    <section className={`component
      ${style.cta}
      component--spc-t-${props.spacing?.top || 'standard'}
      component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Animate>
        <Container size="wide">
          <div className={style.cta__wrapper}>
            {props.backgroundImage && (
              <div className={style.cta__background}>
                <Image
                  src={props.backgroundImage}
                  className={style['cta__background-image']}
                  fill
                  />
              </div>
            )}
            <div className={style.cta__content}>
              {props.eyebrow && <Eyebrow text={props.eyebrow} className="animate" />}
              <h2 className={`${style.cta__heading} animate animate--fade-up`}>{props.heading}</h2>
              {props.content && (
                <div className={`${style.cta__content} margin-fix animate`} dangerouslySetInnerHTML={{ __html: props.content }}></div>
              )}
              {props.buttons?.length && (
                <ButtonRow alignment="center" style={{
                  marginTop: 40
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
            </div>
          </div>
        </Container>
      </Animate>
    </section>
  )
}

Builder.registerComponent(CTA, {
  name: "CTA",
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
      name: 'backgroundImage',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
    },
    {
      ...(getButtonProps()),
    },
    {
      ...(getSpacingProps()),
    },
  ],
})