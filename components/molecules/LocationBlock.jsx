import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

import style from './LocationBlock.module.scss'

const LocationBlock = (props) => {

  return (
    <div className={style.locationBlock}>
      <h4 className={style.locationBlock__title}>{props.title}</h4>
      {props.address && (
        <div className={style.locationBlock__address} dangerouslySetInnerHTML={{ __html: props.address }}></div>
      )}
      {props.phone && (
        <div className={style.locationBlock__phone}>
          <a href={`tel:${props.phone}`}>{props.phone}</a>
        </div>
      )}
      {props.whatsapp && (
        <div className={style.locationBlock__whatsapp}>
          <a href={`https://wa.me/${props.whatsapp}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={brands('whatsapp')} />
          </a>
        </div>
      )}
    </div>
  )
}

Builder.registerComponent(LocationBlock, {
  name: 'Location Block',
  inputs: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'address',
      type: 'richText',
    },
    {
      name: 'phone',
      type: 'string',
    },
    {
      name: 'whatsapp',
      type: 'string',
    },
  ],
  models: ['footer'],
});
