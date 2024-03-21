import React from 'react';
import { withChildren, Builder } from '@builder.io/react';

import Animate from '/components/atoms/Animate';

import style from './ExperiencesCategory.module.scss'

const ExperiencesCategory = (props) => {


  return (
    <Animate>
      <div className={style.ExperiencesCategory}>
        <h2 className={`${style.experiencesCategory__heading} animate animate--fade-up`}>{props.title}</h2>
        <div className={style.experiencesCategory__list}>
          {props.children}
        </div>
      </div>
    </Animate>
  )
}

const ExperiencesCategoryWithChildren = withChildren(ExperiencesCategory)

Builder.registerComponent(ExperiencesCategoryWithChildren, {
  name: 'Experiences Category',
  inputs: [
    {
      name: 'title',
      type: 'string',
      defaultValue: 'Category Title',
    },
  ],
  models: ['page'],
  defaultChildren: [
    {
      '@type': '@builder.io/sdk:Element',
      component: {
        name: 'Experiences Item',
        options: {
          title: 'Experience 1',
        },
      },
    }
  ],
})