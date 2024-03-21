import React, { useState } from "react"
import { builder, BuilderComponent, Builder } from '@builder.io/react';
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

const NavMenu = (props) => {

  const [subMenuOpen, setsubMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setsubMenuOpen(!subMenuOpen);
  }
  
  const nav = props.nav.data.pages

	return (
    <ul className="menu">
    {nav.length && nav.map((menuItem,i) => (
      <li className={`menu__item ${menuItem.subPages && 'menu__item--has-children'}`} 
      key={'menuItem_' + i}>
        <Link href={menuItem.page.value.data.url}>
          {menuItem.subPages && (
            <a className={`menu__item-link ${subMenuOpen ? "subMenuOpen" : ""}`} 
            onClick={toggleMobileMenu}
            onMouseEnter={() => setsubMenuOpen(true)}
            onMouseLeave={() => setsubMenuOpen(false)}>
              {menuItem.page.value.name}
              <FontAwesomeIcon className="menu__item-icon" icon={solid('chevron-down')}/>
            </a>
          ) || (
          <a className="menu__item-link">
            {menuItem.page.value.name}
          </a>
          )}
        </Link>

        {menuItem.subPages && subMenuOpen && (
          <ul className={`menu__submenu`} onMouseEnter={() => setsubMenuOpen(true)}>
            {menuItem.subPages.map((subPage,i) => (
              <li className="menu__submenu-item" key={'subPage_' + i}>
                <Link href={subPage.page.value.data.url}>
                  <a className="menu__submenu-item-link">
                    {subPage.page.value.name}
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

export default NavMenu
