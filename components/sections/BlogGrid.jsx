import React, { useState } from 'react'
import { builder, BuilderComponent, Builder } from '@builder.io/react'
import { getButtonProps, getSpacingProps } from '/utilities/inputs'
import useSWRInfinite from 'swr/infinite'

import Animate from '../atoms/Animate'
import Arrow from '../atoms/Arrow'
import Container from '../atoms/Container'
import BlogGridItem from '../molecules/BlogGridItem'

import style from './BlogGrid.module.scss'

const BlogGrid = (props) => {
  //const [pageIndex, setPageIndex] = useState(0)
  
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const getKey = (pageIndex, previousPageData) => {
    // reached the end
    if (previousPageData && !previousPageData.results.length){
      return null
    }
    
    // first page, we don't have `previousPageData`
    if (pageIndex === 0) {
      return `https://cdn.builder.io/api/v2/content/post?apiKey=91ef722532bb4940b783c33d6d8d9c47&limit=${props.postsPerPage + 1}`
    } 
    
    let offset = pageIndex * props.postsPerPage
    // add the cursor to the API endpoint
    return `https://cdn.builder.io/api/v2/content/post?apiKey=91ef722532bb4940b783c33d6d8d9c47&limit=${props.postsPerPage + 1}&offset=${offset}`
  }

  // Find total number of posts & pages
  const { data: allData, error: allError } = useSWRInfinite((index) =>
  `https://cdn.builder.io/api/v2/content/post?apiKey=91ef722532bb4940b783c33d6d8d9c47&limit=0`, fetcher)
  const totalPosts = allData ? allData[0].results.length : 0
  const totalPages = Math.ceil(totalPosts / props.postsPerPage)

  // Use SWRInfinite to get pages of posts
  const { data, error, isValidating, mutate, size, setSize } = useSWRInfinite(getKey, fetcher, {
    //initialSize: 0,
  })
  let posts = data?.[size - 1]?.results

  // check the results to see if there are more pages
  const isEmpty = posts?.length === 0;
  const isReachingEnd =
    isEmpty || (posts && posts.length < props.postsPerPage + 1);

  // trim away the extra post we fetched to see if there's more
  if (posts?.length > props.postsPerPage) {
    posts = posts.slice(0, props.postsPerPage)
  }

  // check for other states
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  
  const isRefreshing = isValidating && data && data.length === size;

  return (
    <section className={`component
      ${style.blogGrid}
      component--spc-t-${props.spacing?.top || 'standard'}
      component--spc-b-${props.spacing?.bottom || 'standard'}`}>
      <Animate>
        <Container size="wide">
          <div className={style.blogGrid__grid}>
            {posts?.map((post, index) => (
              <BlogGridItem key={'post_' + index} post={post} />
            ))}
          </div>
          <div className={style.blogGrid__pagination}>
            <button
              className={`${style['blogGrid__pagination-button']} ${style['blogGrid__pagination-button--prev']}`}
              onClick={() => setSize(size - 1)}
              disabled={size === 1}
              >
              <Arrow direction="back" />
            </button>
            <div className={style['blogGrid__pagination-numbers']}>
              {size > 2 && <button className={`${style['blogGrid__pagination-number']} ${style['blogGrid__pagination-number--first']}`} onClick={() => setSize(1)}>1</button>}
              {size > 3 && <span className={`${style['blogGrid__pagination-number']} ${style['blogGrid__pagination-number--ellipsis']}`}>...</span>}
              {size > 1 && <button className={style['blogGrid__pagination-number']} onClick={() => setSize(size - 1)}>{size - 1}</button>}
              <span className={`${style['blogGrid__pagination-number']} ${style['blogGrid__pagination-number--current']}`}>{size}</span>
              {!isReachingEnd && <button className={style['blogGrid__pagination-number']} onClick={() => setSize(size + 1)}>{size + 1}</button>}
              {size < totalPages - 2 && <span className={`${style['blogGrid__pagination-number']} ${style['blogGrid__pagination-number--ellipsis']}`}>...</span>}
              {size < totalPages - 1 && <button className={`${style['blogGrid__pagination-number']} ${style['blogGrid__pagination-number--last']}`} onClick={() => setSize(totalPages)}>{totalPages}</button>}
            </div>
            <button
              className={`${style['blogGrid__pagination-button']} ${style['blogGrid__pagination-button--next']}`}
              onClick={() => setSize(size + 1)}
              disabled={isReachingEnd}
              >
              <Arrow />
            </button>
          </div>
        </Container>
      </Animate>
    </section>
  )
}

Builder.registerComponent(BlogGrid, {
  name: 'Blog Grid',
  inputs: [
    {
      name: 'postsPerPage',
      type: 'number',
      defaultValue: 6,
      required: true,
    },
  ]
})