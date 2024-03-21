import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import { builder, Builder } from '@builder.io/react';

export const getServerSideProps = async (ctx) => {
  let pages = await fetch("https://cdn.builder.io/api/v2/content/page?apiKey=91ef722532bb4940b783c33d6d8d9c47&fields=data.url,lastUpdated")
  pages = await pages.json();
  const pagesSitemaps = pages.results.map((item) => ({
    loc: `https://byformation.com${item.data.url}`,
    lastmod: new Date(item.lastUpdated).toISOString(),
  }));

  let posts = await fetch("https://cdn.builder.io/api/v2/content/post?apiKey=91ef722532bb4940b783c33d6d8d9c47&fields=data.url,lastUpdated")
  posts = await posts.json();
  const postsSitemaps = posts.results.map((item) => ({
    loc: `https://byformation.com${item.data.url}`,
    lastmod: new Date(item.lastUpdated).toISOString(),
  }));

  let experiences = await fetch("https://cdn.builder.io/api/v2/content/experience?apiKey=91ef722532bb4940b783c33d6d8d9c47&fields=data.url,lastUpdated")
  experiences = await experiences.json();
  const experiencesSitemaps = experiences.results.map((item) => ({
    loc: `https://byformation.com${item.data.url}`,
    lastmod: new Date(item.lastUpdated).toISOString(),
  }));

  const fields = [
    ...pagesSitemaps, 
    ...postsSitemaps, 
    ...experiencesSitemaps
  ]

  return getServerSideSitemap(ctx, fields)
};

export default function Site() {}