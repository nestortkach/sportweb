import React from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons'

import style from './SocialIcons.module.scss'

const SocialIcons = (props) => {

  const myIcons = {
    'facebook': faFacebookF,
    'twitter': faTwitter,
    'instagram': faInstagram,
    'linkedin': faLinkedinIn,
    'youtube': faYoutube
  }

  return (
    <div className={style.socialIcons}>
      {props.icons && props.icons.map((icon, index) => {
        return (
          <a
            key={index}
            href={icon.url}
            target="_blank"
            rel="noopener noreferrer"
            className={style.socialIcons__link}
          >
            <FontAwesomeIcon
              icon={myIcons[icon.network]}
              className={style.socialIcons__icon}
            />
          </a>

        )}
      )}
    </div>
  )
}

Builder.registerComponent(SocialIcons, {
  name: 'Social Icons',
  inputs: [
    {
      name: 'icons',
      type: 'list',
      copyOnAdd: false,
      subFields: [
        {
          name: 'network',
          type: 'string',
          defaultValue: 'facebook',
          enum: [
            'facebook',
            'twitter',
            'instagram',
            'linkedin',
            'youtube',
          ],
        },
        {
          name: 'url',
          type: 'string',
          defaultValue: 'https://www.facebook.com',
        },
      ],
    }
  ],
  models: ['footer'],
});
