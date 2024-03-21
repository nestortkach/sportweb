import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import Image from 'next/future/image'
import { getSpacingProps } from '../../utilities/inputs'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'
import Eyebrow from '../atoms/Eyebrow'
import Arrow from '../atoms/Arrow'

const Highlights = props => {

	return (
    <section className={`highlights component component--spc-t-none component--spc-b-none`}>
      <Animate>
        <div className={`highlights__header component--spc-t-${props.spacing?.top || 'standard'}`}>
          <Container size="wide">
            {props.eyebrow && <Eyebrow className="highlights__eyebrow animate" text={props.eyebrow} />}
            {props.heading && (
              <h2 className="component__heading highlights__heading animate animate--fade-up">{props.heading}</h2>
            )}
            {props.content && (
              <div className="highlights__content margin-fix animate" dangerouslySetInnerHTML={ { __html: props.content } }></div>
            )}
            
          </Container>
        </div>
      </Animate>
        <div className="highlights__gallery">
          <Container size="wide">
            {props.gallery?.length && (
              <Animate>
                <div className="highlights__gallery-grid">
                  {props.gallery.map((image, index) => (
                    <div key={index} className="highlights__gallery-item animate">
                      <Image
                        alt=""
                        src={image.photo}
                        width="555"
                        height="450"
                        className="highlights__gallery-image"
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Animate>
            )}
          </Container>
        </div>
        <div className={`highlights__highlights
          component--spc-t-standard
          component--spc-b-${props.spacing?.bottom || 'standard'}`}>
          <Animate>
            <Container size="wide">
              {props.highlights?.heading && (
                <h3 className="highlights__highlights-heading animate animate--fade-up">{props.highlights.heading}</h3>
              )}
              {props.highlights?.list?.length && (
                <div className="highlights__highlights-grid">
                  {props.highlights.list.map((item, index) => (
                    <div key={index} className="highlights__highlights-item animate animate--fade-right">
                      <span className="highlights__highlights-item-icon">
                        <Arrow className="highlights__highlights-item-arrow" />
                      </span>
                      <span className="highlights__highlights-item-text">{item.item}</span>
                    </div>
                  ))}
                </div>
              )}
            </Container>
          </Animate>
        </div>
    </section>
  )
}

Builder.registerComponent(Highlights, {
  name: 'Highlights',
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
      name: 'gallery',
      type: 'list',
      subFields: [
        {
          name: 'photo',
          type: 'file',
          allowedFileTypes: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
        },
      ],
    },
    {
      name: 'highlights',
      type: 'object',
      subFields: [
        {
          name: 'heading',
          type: 'string',
        },
        {
          name: 'list',
          type: 'list',
          subFields: [
            {
              name: 'item',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      ...(getSpacingProps()),
    },
  ],
})


         