import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import Image from 'next/future/image'
import { getSpacingProps } from '../../utilities/inputs'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'
import ButtonRow from '../molecules/ButtonRow'
import Button from '../atoms/Button'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'


const Memberships = props => {
  return (

    <section className={`component memberships memberships--theme-${props.theme} component--spc-t-${props.spacing?.top || 'standard'} component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Animate>
        <Container size="wide">
          {props.heading && (
            <h2 className="component__heading memberships__heading animate animate--fade-up">{props.heading}</h2>
          )}
          <div className="memberships__categories">
            {props.categories?.length && props.categories.map((category, index) => (
              <div className="memberships__category" key={'category_' + index}>
                 {props.heading && (
                  <h4 className="memberships__category-title">{category.heading}</h4>
                  )}
                  <div className="memberships__programmes">
                  {category.programmes?.length && category.programmes.map((programme, index) => (
                    <div className="memberships__programme" key={'programme_' + index}>
                      <div className="memberships__programme-image">
                        <Image
                          className="memberships__programme-image"
                          src={programme.photo}
                          alt="Programme Photo"
                          width={300}
                          height={286}
                        />
                      </div>
                      <div className="memberships__programme-content">
                        <h3 className="memberships__programme-title">{programme.heading}</h3>
                        <div className="memberships__programme-description" dangerouslySetInnerHTML={{ __html: programme.content }}></div>
                        
                        {programme.button && (
                        <Button 
                        type="underlined"
                        color= {Button.color}
                        icon={solid('chevron-right')}
                        url="/get-started">Get Started</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Animate>
    </section>
  )
}

Builder.registerComponent(Memberships, {
  name: 'Memberships',
  inputs: [
    {
      name: 'heading',
      type: 'string',
      defaultValue: 'Membership Programmes',
    },
    {
      name: 'categories',
      type: 'list',
      subFields: [
        {
          name: 'heading',
          type: 'string',
        },
        {
          name: 'programmes',
          type: 'list',
          subFields: [
            {
              name: 'photo',
              type: 'file',
              allowedFileTypes: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
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
              name: 'button',
              type: 'boolean',
              defaultValue: true,
            }
          ],
        },
      ],
    },
    {
      name: 'theme',
      type: 'string',
      enum: ['light', 'dark'],
      defaultValue: 'dark',
    },
    {
      ...(getSpacingProps()),
    },
  ],
})