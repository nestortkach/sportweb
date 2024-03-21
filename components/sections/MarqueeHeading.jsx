import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import { getSpacingProps } from '/utilities/inputs'
import Image from 'next/future/image'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

import Animate from '../atoms/Animate'
import Container from '../atoms/Container'

import style from './MarqueeHeading.module.scss'

const MarqueeHeading = (props) => {

  const myRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const el = myRef.current;
    const trigger = triggerRef.current;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: '-100px bottom',
        end: '500px top',
        y: 0,
        scrub: 1,
      }
    });

    tl.to(el, {
      ease: "none",
      xPercent: -20,
    });
  }, [])

	return (
    <section className={`component 
    ${style['marqueeHeading']}
    ${style['marqueeHeading--theme-' + props.theme]}
    marqueeHeading--theme-${props.theme}
    component--spc-t-${props.spacing?.top || 'standard'} 
    component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Animate>
      <div className={style['marqueeHeading__grid']}>
        <div className={style['marqueeHeading__image']}>
          <Container size="wide">
            {props.image && (
            <div className={style['marqueeHeading__image-container']}>
              <Image 
              src={props.image}
              priority
              fill />
            </div>
            )}
          </Container>
        </div>
        <div ref={triggerRef} className={style['marqueeHeading__content']}>
        {props.heading && (
          <h2 ref={myRef} className={`${style['marqueeHeading__title']}`}>
          <span>{props.heading}</span>
          <span>{props.heading}</span>
          <span>{props.heading}</span>
          <span>{props.heading}</span>
          <span>{props.heading}</span>
          <span>{props.heading}</span>
          </h2>
        )}
        </div>
      </div>
      </Animate>
    </section>
  )
}

Builder.registerComponent(MarqueeHeading, {
  name: "Marquee Heading",
  inputs: [
    {
      name: 'heading',
      type: 'string',
      required: true,
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
      name: 'image',
      type: 'file',
    },
    {
      ...(getSpacingProps()),
    },
  ]
})

