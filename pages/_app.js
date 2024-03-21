import React from 'react'
import '../styles/normalize.css'
import '../styles/global.scss'
import Script from 'next/script'


// Fix Font Awesome icons
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

// Section Imports
import BigButton from '../components/sections/BigButton'

// Molecule Imports
import VerticalMenu from '../components/molecules/VerticalMenu'
import LocationBlock from '../components/molecules/LocationBlock'
import SocialIcons from '../components/molecules/SocialIcons'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MGR3N5P');
        `}
      </Script>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
