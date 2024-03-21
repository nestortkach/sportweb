import React from 'react';
import Link from 'next/link';
import Image from 'next/future/image';

import Arrow from '/components/atoms/Arrow'
import Button from '../atoms/Button';

import style from './BlogGridItem.module.scss'

const BlogGridItem = (props) => {

  const post = props.post
  // Format post date
  const date = new Date(post.firstPublished)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link href={post.data.url || '/'} passHref>
        <a className={`${style.blogGridItem}`} href={post.data.url}>
          <div className={style['blogGridItem__image-wrap']}>
            <Image
              className={style['blogGridItem__image']}
              src={post.data.featuredImage}
              fill
              sizes="(max-width: 767px) 100vw,
              (max-width: 1099px) 500px,
              363px"
            />
          </div>
          <span className={style.blogGridItem__date}>{formattedDate}</span>
          <h3 className={style.blogGridItem__title}>{post.data.title}</h3>
          <span className={`${style.blogGridItem__button}`}>Read more <Arrow className={style['blogGridItem__button-arrow']} /></span>
        </a>
    </Link>
  )
}

export default BlogGridItem