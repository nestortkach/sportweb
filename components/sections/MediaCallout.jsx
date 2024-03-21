import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import Image from 'next/future/image'
import { getButtonProps, getSpacingProps } from '../../utilities/inputs'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'
import Eyebrow from '../atoms/Eyebrow'
import ButtonRow from '../molecules/ButtonRow'
import Button from '../atoms/Button'

const MediaCallout = (props) => {

	return (
    <section className={`component 
      mediaCallout 
      mediaCallout--theme-${props.theme}
      component--spc-t-${props.spacing?.top || 'standard'}
      component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Animate>
        <Container size="wide">
          <div className="mediaCallout__flex">
            <div className="mediaCallout__media animate animate--fade-right">
              {props.mediaType === 'photo' && (
                <Image
                    className="mediaCallout__media-photo"
                    src={props.photo}
                    width="555"
                    height="450"
                    alt=""
                    style={{
                      objectFit: 'cover',
                    }}
                  />
              )}
            </div>
            <div className="mediaCallout__content animate animate--fade-in">
              {props.eyebrow && <Eyebrow text={props.eyebrow} />}
              <h2 className="mediaCallout__heading">{props.heading}</h2>
              {props.content && (
                <div className="mediaCallout__text margin-fix" dangerouslySetInnerHTML={ { __html: props.content } }></div>
              )}
              {props.buttons?.length && (
                <ButtonRow alignment="left" style={{
              marginTop: 50
            }}>
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

Builder.registerComponent(MediaCallout, {
  name: 'Media Callout',
  inputs: [
    {
      name: 'theme',
      type: 'string',
      enum: ['light', 'dark'],
      defaultValue: 'light',
      required: true,
    },
    {
      name: 'mediaType',
      type: 'string',
      enum: ['photo'],
      defaultValue: 'photo',
      required: true,
    },
    {
      name: 'photo',
      type: 'file',
      allowedFileTypes: ['jpeg', 'jpg', 'png', 'gif'],
    },
    {
      name: 'heading',
      type: 'string',
      defaultValue: 'Heading',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      defaultValue: 'Content',
      required: true,
    },
    {
      ...(getButtonProps())
    },
    {
      ...(getSpacingProps())
    }
  ],
})
