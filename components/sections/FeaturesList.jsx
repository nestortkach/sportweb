import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import { getSpacingProps } from '../../utilities/inputs'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'
import Eyebrow from '../atoms/Eyebrow'
import Arrow from '../atoms/Arrow'

const FeaturesList = props => {

	return (
    <section className={`featuresList 
      component
      featuresList--theme-${props.theme}
      component--spc-t-${props.spacing?.top || 'standard'}
      component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Animate>
        <Container size="wide">
          <div className="featuresList__cols">
            <div className="featuresList__col featuresList__col--left animate animate--fade-right">
            {props.eyebrow && <Eyebrow className="featuresList__eyebrow" text={props.eyebrow} />}
            {props.heading && (
              <h2 className="component__heading featuresList__heading">{props.heading}</h2>
            )}
            {props.content && (
              <div className="featuresList__content margin-fix" dangerouslySetInnerHTML={ { __html: props.content } }></div>
            )}
            </div>
            <div className="featuresList__col featuresList__col--sep animate" />
            <div className="featuresList__col featuresList__col--right">
            {props.list?.length && (
              <div className="featuresList__list">
                {props.list.map((item, index) => (
                  <div key={index} className="featuresList__list-item animate">
                    <span className="featuresList__list-item-icon">
                      <Arrow className="featuresList__list-item-arrow" />
                    </span>
                    <span className="featuresList__list-item-text">{item.item}</span>
                  </div>
                ))}
              </div>
            )}
            </div>
          </div>
        </Container>
      </Animate>
    </section>
  )
}

Builder.registerComponent(FeaturesList, {
  name: 'Features List',
  inputs: [
    {
      name: 'theme',
      type: 'string',
      enum: ['light', 'dark'],
      defaultValue: 'light',
      required: true,
      helperText: 'Choose the theme for this component',
    },
    {
      name: 'eyebrow',
      type: 'string',
      helperText: 'The eyebrow text for this component',
    },
    {
      name: 'heading',
      type: 'string',
      helperText: 'The heading text for this component',
    },
    {
      name: 'content',
      type: 'richText',
      helperText: 'The content for this component',
    },
    {
      name: 'list',
      type: 'list',
      subFields: [
        {
          name: 'item',
          type: 'string',
          helperText: 'The item text for this component',
        },
      ],
    },
    {
      ...(getSpacingProps()),
    }
  ],
})

