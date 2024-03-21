import React, {useEffect, useState} from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react';
import Link from 'next/link'

import style from './VerticalMenu.module.scss'

const VerticalMenu = (props) => {

  const [nav, setNav] = useState(null)

  useEffect(() => {
    // Builder API doesn't support multi-layer references, so we need to fetch the data manually
    if (props.nav) {
      const fetchData = async (id) => {
        const navFull = await builder.get('navigation', {
          query: {
            'id': id
          }
        }).toPromise();

        // Check if result is correct
        if (navFull && navFull.id !== id) {
          console.warn('builder.get() returned the incorrect navigation. Searching again, but this may lead to performance degradation.')
          fetchData(id)
        } else {
          setNav(navFull?.data.pages || null)
        }
      }
      fetchData(props.nav.id)
    } else {
      setNav(null)
    }
  }, [])

	return (
    <ul className={style.verticalMenu}>
      {nav?.length && nav.map((menuItem,i) => (
        <li className={style.verticalMenu__item} key={'menuItem_' + i}>
          <Link href={menuItem.page.value?.data.url || '/'}>
            <a className={style['verticalMenu__item-link']}>
              {menuItem.page.value?.name || 'No Page Found'}
            </a>
          </Link>
          {menuItem.subPages && menuItem.subPages.length > 0 && (
            <ul className={style.verticalMenu__subMenu}>
              {menuItem.subPages.map((subMenuItem, j) => (
                <li className={style['verticalMenu__subMenu-item']} key={'subMenuItem_' + j}>
                  <Link href={subMenuItem.page.value?.data.url || '/'}>
                    <a className={style['verticalMenu__subMenu-item-link']}>
                      {subMenuItem.page.value?.name || 'No Page Found'}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

Builder.registerComponent(VerticalMenu, {
  name: "Vertical Menu",
  inputs: [
    {
      name: 'nav',
      type: 'reference',
      allowedModels: ['Navigation'],
    },
  ],
  models: ['footer'],
})
