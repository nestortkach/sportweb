import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';
import Head from 'next/head';
import React from 'react';
import { BuilderComponent, builder, useIsPreviewing, Builder } from '@builder.io/react';
import Image from 'next/future/image'

import Modal from 'react-modal'

import Header from '/components/header'
import Loader from '/components/atoms/Loader'

import Container from "/components/atoms/Container"
import ButtonRow from "/components/molecules/ButtonRow"
import Button from "/components/atoms/Button"
import StackItem from '/components/molecules/StackItem'

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import style from './post.module.scss'

// Initialize the Builder SDK with your organization's API Key
// Find the API Key on: https://builder.io/account/settings
builder.init('91ef722532bb4940b783c33d6d8d9c47');

export async function getStaticProps({ params }) {
  // Fetch the first page from Builder that matches the current URL.
  // Use the `userAttributes` field for targeting content.
  // For more, see https://www.builder.io/c/docs/targeting-with-builder
  const post = await builder
    .get('post', {
      userAttributes: {
        urlPath: '/blog/' + (params?.post || ''),
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
      post: post || null,
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
  const posts = await builder.getAll('post', {
    fields: 'data.url', // only request the `data.url` field
    options: { noTargeting: true },
    limit: 0,
  });

  return {
    paths: posts.map(post => `${post.data?.url}`),
    fallback: true,
  };
}

Modal.setAppElement('#__next')

export default function Post({ post, nav, footer, getStarted }) {
  const router = useRouter();
  //  This flag indicates if you are viewing the page in the Builder editor.
  const isPreviewing = useIsPreviewing();

  if (router.isFallback) {
    return <Loader />;
  }

  //  Add your error page here to return if there are no matching
  //  content entries published in Builder.
  if (!post && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  // Format post date
  const date = new Date(post.firstPublished)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <>
      <Head>
        {/* Add any relevant SEO metadata or open graph tags here */}
        <title>{`${post?.data.title} | Formation`}</title>
        <meta name="description" content={post?.data.descripton} />
      </Head>
      
      <Header nav={nav} />

      <section className={`hero ${style['hero-blog']}`}>
        <Container>
          <span className={style['hero-blog__date']}>{formattedDate}</span>
          <h1 className={style['hero-blog__title']}>{post?.name}</h1>
        </Container>
      </section>
      <section className={`component component--spc-t-standard component--spc-b-standard ${style['blog-content']}`}>
        <Container>
          <BuilderComponent model="post" content={post} options={{ includeRefs: true }} />
        </Container>
      </section>
      
      <BuilderComponent model="footer" content={footer} options={{ 
        includeRefs: true,
        noTraverse: false
      }} />
    </>
  );
}