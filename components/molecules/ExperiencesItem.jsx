import React from 'react';
import { BuilderComponent, Builder } from '@builder.io/react';
import Link from 'next/link';
import Image from 'next/future/image';

import Arrow from '/components/atoms/Arrow'

import style from './ExperiencesItem.module.scss'

const ExperiencesItem = (props) => {


  return (
    <Link href={props.link || '/'} passHref>
      <div className="animate animate--fade-right">
        <a className={`${style.experiencesItem} ${props.stack && style['experiencesItem--stack']}`} href={props.link}>
          <div className={style.experiencesItem__image}>
            {props.image && (
              <Image
              src={props.image}
              alt={props.title}
              className={style['experiencesItem__image-image']}
              width={180}
              height={140}
              /> 
            )}
          </div>
          <div className={style.experiencesItem__content}>
            <h3 className={style.experiencesItem__title}>{props.title}</h3>
            {props.stack && (
              <div className={style.experiencesItem__description} dangerouslySetInnerHTML={{ __html: props.description }}></div>
            )}
          </div>
          <div className={style.experiencesItem__arrow}>
            <Arrow />
          </div>
        </a>
      </div>
    </Link>
  )
}

Builder.registerComponent(ExperiencesItem, {
  name: 'Experiences Item',
  inputs: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'link',
      type: 'url',
    },
    {
      name: 'stack',
      type: 'boolean',
    },
    {
      name: 'image',
      type: 'file',
    },
    {
      name: 'description',
      type: 'longText',
    },
  ],
  models: ['page'],
})
