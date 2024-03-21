import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import React from 'react';
import { BuilderComponent, builder, useIsPreviewing, Builder } from '@builder.io/react';

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

// Molecule Imports
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
        urlPath: '/get-started',
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

  return {
    props: {
      page: page || null,
      nav: nav || null,
      footer: footer || null,
    },
    revalidate: 5,
  };
}

export default function Page({ page, nav, footer }) {
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

  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{`${page?.data.title} | Formation`}</title>
        <meta name="description" content={page?.data.descripton} />
      </Head>
      <Header nav={nav} />

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
  name: 'Molecules',
  items: [
    { name: 'Get Started Link' },
  ],
}) 