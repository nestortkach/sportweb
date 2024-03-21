import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import { getButtonProps, getSpacingProps } from '../../utilities/inputs'

import Container from '../atoms/Container'
import ButtonRow from '../molecules/ButtonRow'
import Button from '../atoms/Button'
import Eyebrow from '../atoms/Eyebrow'
import Animate from '../atoms/Animate'

import style from './CardGrid.module.scss'

const CardGrid = (props) => {

	return (
    <section className={`component 
      ${style.cardGrid} 
      ${style['cardGrid--theme-' + props.theme]}
      component--spc-t-${props.spacing?.top || 'standard'}
      component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Animate>
        <Container size="wide">
          {props.eyebrow && <Eyebrow className={`${style.cardGrid__eyebrow} animate`} text={props.eyebrow} />}
          {props.heading && (
            <h2 className={`component__heading ${style.cardGrid__heading} animate animate--fade-up`}>{props.heading}</h2>
          )}
          {props.cards?.length && (
          <div className={style.cardGrid__grid}>
            {props.cards.map((card, index) => (
              <div className={`${style.cardGrid__card} animate animate--fade-right`} key={'card_' + index}>
                <h3 className={style['cardGrid__card-heading']}>{card.heading}</h3>
                <div className={`${style['cardGrid__card-content']} margin-fix`} dangerouslySetInnerHTML={ { __html: card.content } }></div>
                {card.buttons?.length && (
                  <ButtonRow alignment="left" className={style['cardGrid__card-buttons']}>
                    {card.buttons.map((button, index) => (
                      <Button key={'button_' + index}
                        type={button.type}
                        url={button.link.url} 
                        target={button.link.target}
                        color={button.color}>
                          {button.link.title}
                      </Button>
                    ))}
                  </ButtonRow>
                )}
              </div>
            ))}
          </div>
          )}
        </Container>
      </Animate>
    </section>
  )
}
Builder.registerComponent(CardGrid, {
  name: 'Card Grid',
  inputs: [
    {
      name: 'theme',
      type: 'string',
      enum: ['light', 'dark'],
      defaultValue: 'light',
    },
    {
      name: 'eyebrow',
      type: 'string',
    },
    {
      name: 'heading',
      type: 'string',
    },
    {
      name: 'cards',
      type: 'list',
      copyOnAdd: false,
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
          ...(getButtonProps()),
        },
      ],
    },
    {
      ...(getSpacingProps()),
    },
  ],
})





