import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import React from 'react';
import { BuilderComponent, builder, useIsPreviewing, Builder } from '@builder.io/react';

import Modal from 'react-modal'

import Header from '../components/header'
import Loader from '../components/atoms/Loader'

// Section Imports
import Callout from '../components/sections/Callout'
import CalloutGrid from '../components/sections/CalloutGrid'
import CardGrid from '../components/sections/CardGrid'
import CTA from '../components/sections/CTA'
import MediaCallout from '../components/sections/MediaCallout'
import FeaturesList from '../components/sections/FeaturesList'
import Highlights from '../components/sections/Highlights'
import ExperiencesSlider from '../components/sections/ExperiencesSlider'
import BlogGrid from '../components/sections/BlogGrid'
import Memberships from '../components/sections/Memberships'
import MarqueeHeading from '../components/sections/MarqueeHeading'
import MindBody from '../components/sections/MindBody'


// Hero Imports
import Homepage from '../components/heroes/Homepage'
import Short from '../components/heroes/Short'
import TextOnly from '../components/heroes/TextOnly'

//Molecule Imports
import ExperiencesCategory from '../components/molecules/ExperiencesCategory'
import ExperiencesItem from '../components/molecules/ExperiencesItem'
import GetStartedLink from '../components/molecules/GetStartedLink'

// Initialize the Builder SDK with your organization's API Key
// Find the API Key on: https://builder.io/account/settings
builder.init('91ef722532bb4940b783c33d6d8d9c47');

export async function getStaticProps({ params }) {
  // Fetch the first page from Builder that matches the current URL.
  // Use the `userAttributes` field for targeting content.
  // For more, see https://www.builder.io/c/docs/targeting-with-builder
  const page = await builder
    .get('page', {
      userAttributes: {
        urlPath: '/' + (params?.page?.join('/') || ''),
      },
      includeRefs: true,
    })
    .toPromise();
  
  const nav = await builder.get('navigation', {
    query: {
      'id': 'f8841974e4874e3ba862431f52432f6a'
    }
  }).toPromise();

  const footer = await builder.get('footer', {
    includeRefs: true,
    noTraverse: false
  }).toPromise();

  const getStarted = await builder.get('page', {
    userAttributes: {
      urlPath: '/get-started',
    },
    includeRefs: true,
  }).toPromise();

  return {
    props: {
      page: page || null,
      nav: nav || null,
      footer: footer || null,
      getStarted: getStarted || null
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  //  Fetch all published pages for the current model.
  //  Using the `fields` option will limit the size of the response
  //  and only return the `data.url` field from the matching pages.
  const pages = await builder.getAll('page', {
    fields: 'data.url', // only request the `data.url` field
    options: { noTargeting: true },
    limit: 0,
  });

  return {
    paths: pages.map(page => `${page.data?.url}`),
    fallback: true,
  };
}

Modal.setAppElement('#__next')

export default function Page({ page, nav, footer, getStarted }) {
  const router = useRouter();
  //  This flag indicates if you are viewing the page in the Builder editor.
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <Loader />;
  }

  //  Add your error page here to return if there are no matching
  //  content entries published in Builder.
  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const closeModal = (e) => {
    e.preventDefault()
    router.push(page.data.url, undefined, { scroll: false })
  }

  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{`${page?.data.title} | Formation`}</title>
        <meta name="description" content={page?.data.descripton} />
      </Head>
      <Header nav={nav} />

      <Modal
        isOpen={!!router.query.getStarted}
        className="getStartedModal"
        overlayClassName="getStartedOverlay"
        closeTimeoutMS={300}>
        <div className="getStartedModal__header">
          <div className="modal__close" onClick={closeModal}></div>
        </div>
        <BuilderComponent model="page" content={getStarted} options={{ includeRefs: true }} />
      </Modal>

      {/* Render the Builder page */}
      <BuilderComponent model="page" content={page} options={{ includeRefs: true }} />
      <BuilderComponent model="footer" content={footer} options={{ 
        includeRefs: true,
        noTraverse: false
      }} />
    </>
  );
}

Builder.register('insertMenu', {
  name: 'Hero sections',
  items: [
    { name: 'Homepage' },
    { name: 'Short' },
    { name: 'Text Only' },
  ],
})

Builder.register('insertMenu', {
  name: 'Page sections',
  items: [
    { name: 'Callout' },
    { name: 'Callout Grid' },
    { name: 'Card Grid' },
    { name: 'CTA' },
    { name: 'Media Callout' },
    { name: 'Features List' },
    { name: 'Highlights' },
    { name: 'Experiences Slider' },
    { name: 'Big Button' },
    { name: 'Blog Grid' },
    { name: 'Memberships' },
    { name: 'Marquee Heading' },
    { name: 'MindBody' },
  ],
}) 

Builder.register('insertMenu', {
  name: 'Molecules',
  items: [
    { name: 'Vertical Menu' },
    { name: 'Location Block' },
    { name: 'Experiences Category' },
    { name: 'Experiences Item' },
    { name: 'Social Icons' },
  ],
}) 