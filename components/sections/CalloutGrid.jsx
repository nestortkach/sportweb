import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import Image from 'next/future/image'
import { getButtonProps, getSpacingProps } from '../../utilities/inputs'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'
import ButtonRow from '../molecules/ButtonRow'
import Button from '../atoms/Button'
import Eyebrow from '../atoms/Eyebrow'

const CalloutGrid = (props) => {

	return (
    <section className={`component 
      calloutGrid
      calloutGrid--theme-${props.theme}
      component--spc-t-${props.spacing?.top || 'standard'}
      component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Animate>
        <Container size="wide">
          {props.eyebrow && <Eyebrow className="calloutGrid__eyebrow animate" text={props.eyebrow} />}
          {props.heading && (
            <h2 className="component__heading calloutGrid__heading animate animate--fade-up">{props.heading}</h2>
          )}
          {props.content && (
            <div className="calloutGrid__content animate" dangerouslySetInnerHTML={{ __html: props.content }}></div>
          )}
          {props.callouts?.length && (
            <div className="calloutGrid__grid">
              {props.callouts.map((callout, index) => (
                <div 
                  className={`calloutGrid__callout calloutGrid__callout--${props.calloutType} animate`}
                  key={'callout_' + index}>
                  {props.calloutType === 'photo' && (
                  <div className="calloutGrid__callout-photo">
                    <Image
                      src={callout.photo}
                      width="555"
                      height="450"
                      style={{
                        objectFit: 'cover',
                      }}
                      />
                  </div>
                  )}
                  <div className="calloutGrid__callout-content">
                    {props.calloutType === 'icon' && (
                    <div className="calloutGrid__callout-icon">
                      <Image  
                        src={callout.icon}
                        width="50"
                        height="50" />
                    </div>
                    )}
                    <h3 className="calloutGrid__callout-heading">{callout.heading}</h3>
                    <div className="calloutGrid__callout-description margin-fix" dangerouslySetInnerHTML={ { __html: callout.content } }></div>
                    {callout.buttons?.length && (
                      <ButtonRow alignment="left" className="calloutGrid__callout-buttons">
                        {callout.buttons.map((button, index) => (
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
              ))}
            </div>
          )}
        </Container>
      </Animate>
    </section>
  )
}

Builder.registerComponent(CalloutGrid, {
  name: "Callout Grid",
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
      name: 'callouts',
      type: 'list',
      subFields: [
        {
          name: 'heading',
          type: 'string',
        },
        {
          name: 'content',
          type: 'richText',
        },
        {
          name: 'photo',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
        },
        {
          name: 'icon',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
        },
        {
          ...(getButtonProps()),
        },
      ],
    },
    {
      name: 'calloutType',
      type: 'string',
      enum: [
        {
          label: 'Photo',
          value: 'photo',
        },
        {
          label: 'Icon',
          value: 'icon',
        },
      ],
    },
    {
      name: 'theme',
      type: 'string',
      defaultValue: 'light',
      enum: [
        {
          label: 'Light',
          value: 'light',
        },
        {
          label: 'Dark',
          value: 'dark',
        },
      ],
    },
    {
      ...(getSpacingProps()),
    },
  ],
})

