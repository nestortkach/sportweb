import React, { useRef } from "react"
import { builder, BuilderComponent, Builder } from "@builder.io/react"
import Image from "next/future/image"
import Link from "next/link"
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';

import Animate from "../atoms/Animate"
import Arrow from "../atoms/Arrow"
import ArrowHolder from "../molecules/ArrowHolder"

import 'swiper/css';
import style from './ExperiencesSlider.module.scss'

const ExperiencesSlider = (props) => {
  let experiences

  if(props.builderState.state?.sliderExperiences?.results.length > 0) {
    experiences = props.builderState.state.sliderExperiences.results

    // remove first layer of each item in array
    experiences = experiences.map((item) => {
      return item.data
    })

    // filter out items that don't have stack 
    experiences = experiences.filter((item) => {
      if(!item.stack) {
        return item
      }
    })
  } else {
    experiences = props.experiences
  }

  const navigationPrevRef = useRef(null)
  const navigationNextRef = useRef(null)

  return (
    <section className={style.experiencesSlider}>
      <Animate>
        <Swiper 
          modules={[Navigation, Autoplay]}
          slidesPerView={"auto"}
          centeredSlides={true} 
          loop={true}
          className={style.experiencesSlider__slider}
          autoplay={{
            delay: 2000,
            disableOnInteraction: true,
          }}
          navigation={
            {
              nextEl: navigationNextRef.current ? navigationNextRef.current : undefined,
              prevEl: navigationPrevRef.current ? navigationPrevRef.current : undefined,
            }
          }
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current
            swiper.params.navigation.nextEl = navigationNextRef.current
            swiper.navigation.update()
          }}>
          {experiences?.map((experience, index) => (
            <SwiperSlide key={index} className={style.experiencesSlider__slide}>
              <Link href={experience.url}>
                <a className={style['experiencesSlider__slide-link']}>
                  <div className={style['experiencesSlider__slide-image']}>
                    {experience.image && (
                    <Image
                      src={experience.image}
                      width={400}
                      height={280}
                      className={style['experiencesSlider__slide-image-image']} />
                    )}
                  </div>
                  <div className={style['experiencesSlider__slide-content']}>
                    <h3 className={style['experiencesSlider__slide-heading']}>{experience.title}</h3>
                    <div className={`${style['experiencesSlider__slide-text']} margin-fix`} dangerouslySetInnerHTML={ { __html: experience.shortDescription } } />
                  </div>
                </a>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={style.experiencesSlider__arrows}>
          <div 
            className={`${style.experiencesSlider__arrow} ${style['experiencesSlider__arrow--prev']}`}
            ref={navigationPrevRef}>
            <ArrowHolder direction="backward">
              <Arrow />
            </ArrowHolder>
          </div>
          <div 
            className={`${style.experiencesSlider__arrow} ${style['experiencesSlider__arrow--next']}`}
            ref={navigationNextRef}>
            <ArrowHolder direction="forward">
              <Arrow />
            </ArrowHolder>
          </div>
        </div>
      </Animate>
    </section>
  )
}

Builder.registerComponent(ExperiencesSlider, {
  name: "Experiences Slider",
  inputs: [
    {
      name: 'experiences',
      type: 'list',
      defaultValue: [
        {
          title: 'Experience 1',
          url: '/',
          image: 'https://via.placeholder.com/400x280',
          shortDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquet nisl, eget aliquam nisl nisl eu nisl.'
        },
      ],
      subFields: [
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'url',
          type: 'url',
        },
        {
          name: 'image',
          type: 'file',
        },
        {
          name: 'shortDescription',
          type: 'richText',
        },
      ]
    },
  ]
})