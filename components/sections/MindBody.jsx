import React from 'react';
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import { getSpacingProps } from '../../utilities/inputs'
import Script from 'next/script'

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'

import style from './MindBody.module.scss'

const MindBody = props => {


  return (
    <section className={`${style.mindBody}
      component
      mindBody
      ${style[`mindBody--theme-${props.theme}`]}
      component--spc-t-${props.spacing?.top || 'standard'}
      component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Script
        src="https://widgets.mindbodyonline.com/javascripts/healcode.js"
        strategy="afterInteractive"
        onReady={() => {
          // add class to hc-button to style after mindbody has loaded in the elements
          let hcButton = document.querySelector('.hc-button')
          // wait a bit if the button isn't there yet
          if (!hcButton) {
            setTimeout(() => {
              hcButton = document.querySelector('.hc-button')
              hcButton.classList.add('button', 'button--filled', 'button--filled--yellow')
            }, 2000)
          } else {
            hcButton.classList.add('button', 'button--filled', 'button--filled--yellow')
          }
          
          
        }}
      />
      <Animate>
        <Container size="small">
          <healcode-widget
            data-type={props.dataType}
            data-widget-partner={props.dataWidgetPartner}
            data-widget-id={props.dataWidgetId}
            data-widget-version={props.dataWidgetVersion}
            >
          </healcode-widget>
        </Container>
      </Animate>
    </section>
  )
}

Builder.registerComponent(MindBody, {
  name: 'MindBody',
  inputs: [
    {
      name: 'dataType',
      type: 'string',
      defaultValue: 'appointments',
    },
    {
      name: 'dataWidgetPartner',
      type: 'string',
      defaultValue: 'object',
    },
    {
      name: 'dataWidgetId',
      type: 'string',
      defaultValue: '53961150793',
    },
    {
      name: 'dataWidgetVersion',
      type: 'string',
      defaultValue: '0',
    },
    {
      ...(getSpacingProps()),
    },
    {
      name: 'theme',
      type: 'string',
      enum: [
        'light',
        'dark',
      ],
      defaultValue: 'dark',
    }
  ],
})
