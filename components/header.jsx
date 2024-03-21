import React, {useEffect, useState} from "react"
import Link from 'next/link'

import Container from "./atoms/Container"
import Wordmark from "./atoms/Wordmark"
import Button from "./atoms/Button"
import NavMenu from "./molecules/NavMenu"

const Header = (props) => {
  
  const [small, setSmall] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(value => !value);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setSmall(window.pageYOffset > 200)
      );
    }
    // Listen for mobile menu link clicks
    if (typeof window !== "undefined") {
      window.addEventListener("click", e => {
        if (
          e.target.classList.contains("mobile-menu-close") ||
          e.target.classList.contains("menu__item-link") ||
          e.target.classList.contains("menu__submenu-item-link")
          ) {
          setMenuOpen(false);
        }
      });
    }
  }, []);

  const siteOptions = [];

	return (
    <header className={`global-header 
      ${small || menuOpen ? 'global-header--shrink' : ''}
      ${menuOpen ? 'global-header--menu-open' : ''}`}>
        {siteOptions.noticeBar && (
        <div className="global-header__notice">
          <Container>
            <div className="global-header__notice-text margin-fix" dangerouslySetInnerHTML={ { __html: siteOptions.noticeBar } } />
          </Container>
        </div>
        )}
        <div className="global-header__main">
          <Container size="full">
            <div className="global-header__content">
              <div className="global-header__content-col global-header__branding">
                <Link href="/">
                  <a className="global-header__logo-link" onClick={() => setMenuOpen(false)}>
                    <Wordmark />
                  </a>
                </Link>
              </div>
              <div className="global-header__content-col global-header__nav">
                <NavMenu nav={props.nav} />
              </div>
              <div className="global-header__content-col global-header__actions">
                <Button type="filled" color="white" url="/get-started">Get Started</Button>
              </div>
              <div className="global-header__hamburger" onClick={() => toggleMenu()}>
                <span className="global-header__hamburger-bar"></span>
                <span className="global-header__hamburger-bar"></span>
                <span className="global-header__hamburger-bar global-header__hamburger-bar--short"></span>
              </div>
            </div>
          </Container>
        </div>
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
          <Container>
            <div className="mobile-menu__inner">
              <NavMenu nav={props.nav} />
              <Button type="filled" color="white" url="/get-started/" onClick={() => toggleMenu()}>Get Started</Button>
            </div>
          </Container>
        </div>
      </header>
  )
}

export default Header