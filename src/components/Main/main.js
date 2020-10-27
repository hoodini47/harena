import React, { useState } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import LazyLoad from "react-lazyload"
import posed from "react-pose"

import { LazyLoadImage } from "react-lazy-load-image-component"

import TransitionLink from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"

import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, {
  Navigation,
  A11y,
  Lazy,
  Keyboard,
  Mousewheel,
  Autoplay,
} from "swiper"
SwiperCore.use([Navigation, Mousewheel, Keyboard, A11y, Lazy, Autoplay])

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseWheelActive: false,
      transitionLinkTarget: 1,
    }

    // this.handleAniLink = this.handleAniLink.bind(this);
  }

  handleAniLink = e => {
    // const parentSlide = this.
    // console.log(e.currentTarget)
    // e.currentTarget.classList.contains('swiper-slide-active') ? console.log('mamy active') : '';
    // e.currentTarget.classList.contains('swiper-slide-next') ? console.log('mamy active')

    if (e.currentTarget.classList.contains("swiper-slide-active")) {
      this.setState({ transitionLinkTarget: 1 })
      console.log("1szy od lewej")
    }

    if (e.currentTarget.classList.contains("swiper-slide-next")) {
      this.setState({ transitionLinkTarget: 2 })
      console.log("srodkowy")
    }

    if (
      !e.currentTarget.classList.contains("swiper-slide-active") &&
      !e.currentTarget.classList.contains("swiper-slide-next")
    ) {
      e.currentTarget.classList.add("swiper-slide-last-in-viewport")
      this.setState({ transitionLinkTarget: 3 })
      console.log("ostatni")
    }
  }

  handleOnMouseLeave = e => {
    if (e.currentTarget.classList.contains("swiper-slide-last-in-viewport")) {
      e.currentTarget.classList.remove("swiper-slide-last-in-viewport")
    }
  }

  handleWheel = e => {
    const delta = Math.sign(e.deltaY)
    delta < 0
      ? this.setState({ mouseWheelActive: false })
      : this.setState({ mouseWheelActive: true })
  }

  // handleWheel = (e) => {
  //   const allElements = document.querySelectorAll(".thumbnail-image");
  //   console.log(e.target.getBoundingClientRect())
  //   allElements.forEach(element => {
  //     // console.log(element.getBoundingClientRect())
  //     let matrixValue = `${element.getBoundingClientRect().x / 120}`
  //     element.style.transform = `matrix(1.05, 0, 0, 1.05, ${matrixValue}, 0)`
  //   });
  // }

  //https://dev.to/mattrothenberg/recreating-pentagram-com-a-deep-dive-with-gatsby-js-h75

  //https://www.gatsbyjs.com/blog/2018-12-04-per-link-gatsby-page-transitions-with-transitionlink/

  render() {
    let data = this.props.data

    const transitionLinkTarget = this.state.transitionLinkTarget

    let direction

    let exitTransition

    const TRANSITION_LENGTH = 0.7

    if (transitionLinkTarget === 1) {
      direction = "right"
      exitTransition = {
        length: TRANSITION_LENGTH, // Take 1.5 seconds to leave
        trigger: () => {
          if (document) {
            // Preventing overflow here make the animation smoother
            document.body.style.overflow = "hidden"
          }

          const allSlides = document.querySelectorAll(".swiper-slide")
          const firstSlide = document.querySelector(".swiper-slide-active")
          const middleSlide = document.querySelector(".swiper-slide-next")

          const firstSlideBgImage = firstSlide.querySelector(
            ".slide-bg-fullscreen"
          )

          firstSlideBgImage.style.transform = `scale(1)`
          firstSlide.style.width = `100vw`

          console.log(
            `We are exiting 1, target: ${firstSlideBgImage.classList}`
          )
        },
      }
    }

    if (transitionLinkTarget === 2) {
      direction = "top"
      exitTransition = {
        length: TRANSITION_LENGTH, // Take 1.5 seconds to leave
        trigger: () => {
          if (document) {
            // Preventing overflow here make the animation smoother IMO
            document.body.style.overflow = "hidden"
          }

          const allSlides = document.querySelectorAll(".swiper-slide")
          const firstSlide = document.querySelector(".swiper-slide-active")
          const middleSlide = document.querySelector(".swiper-slide-next")

          // firstSlide.style.width = `0%`

          const middleSlideBgImage = middleSlide.querySelector(
            ".slide-bg-fullscreen"
          )
          middleSlideBgImage.style.transform = `scale(1)`
          // middleSlideBgImage.style.backgroundSize = `cover`
          firstSlide.style.width = `0%`
          middleSlide.style.width = `100vw`

          console.log("We are exiting 2")
        },
      }
    }

    if (transitionLinkTarget === 3) {
      direction = "left"

      exitTransition = {
        length: TRANSITION_LENGTH, // Take 1.5 seconds to leave
        trigger: () => {
          if (document) {
            // Preventing overflow here make the animation smoother IMO
            document.body.style.overflow = "hidden"
          }

          const allSlides = document.querySelectorAll(".swiper-slide")
          const firstSlide = document.querySelector(".swiper-slide-active")
          const middleSlide = document.querySelector(".swiper-slide-next")

          const lastSlide = document.querySelector(
            ".swiper-slide-last-in-viewport"
          )

          const lastSlideBgImage = lastSlide.querySelector(
            ".slide-bg-fullscreen"
          )

          lastSlideBgImage.style.transform = `scale(1)`

          firstSlide.style.width = `0%`
          middleSlide.style.width = `0%`
          lastSlide.style.width = `100vw`

          console.log("We are exiting 3")
        },
      }
    }

    const entryTransition = {
      delay: TRANSITION_LENGTH, // Wait 1.5 seconds before entering
      trigger: () => {
        console.log("We are entering")
        if (document && window) {
          // Ensuring we're at the top of the page when the page loads
          // prevents any additional JANK when the transition ends.
          window.scrollTo(0, 0)
          document.body.style.overflow = "visible"
        }
      },
    }

    return (
      <main>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          mousewheel={{
            sensitivity: 3,
          }}
          navigation
          keyboard
          a11y
          lazy={{ loadPrevNext: true, loadPrevNextAmount: 3 }}
          breakpoints={{
            // when window width is >= 640px
            992: {
              slidesPerView: 3,
              freeMode: true,
              // speed: 700,
            },
          }}
        >
          {data.nodes
            .sort((a, b) => {
              const positionA = a.position
              const positionB = b.position
              let comparision = 0
              if (positionA > positionB) {
                comparision = 1
              } else if (positionA < positionB) {
                comparision = -1
              }
              return comparision
            })
            .map((element, index) => {
              return (
                <SwiperSlide
                  key={index}
                  onMouseOver={this.handleAniLink}
                  onMouseLeave={this.handleOnMouseLeave}
                >
                  <div className={`single-project-container`}>
                    <TransitionLink
                      to={
                        element.locale === "pl"
                          ? `${element.projectCategory}/${element.slug}`
                          : `/${element.locale}/${element.projectCategory}/${element.slug}`
                      }
                      exit={exitTransition}
                      entry={entryTransition}
                    >
                      {/* <Link
                      id={index}
                      to={
                        element.locale === "pl"
                          ? `${element.projectCategory}/${element.slug}`
                          : `/${element.locale}/${element.projectCategory}/${element.slug}`
                      }
                      cover
                      bg={`url(${element.fullScreenPhoto.fluid.src}) center / cover`}
                      direction={direction}
                      duration={3}
                    > */}
                      {/* <TransitionLink
                                exit={{
                                  length: length,
                                  trigger: ({ exit, node }) =>
                                    this.someCustomDefinedAnimation({ exit, node, direction: "out" }),
                                }}
                                entry={{
                                  length: 0,
                                  trigger: ({ exit, node }) =>
                                    this.someCustomDefinedAnimation({ exit, node, direction: "in" }),
                                }}
                                // {...props}
                              > */}

                      {/* <LazyLoadImage
                        className={
                          this.state.mouseWheelActive
                            ? `move-right`
                            : `move-left`
                        }
                        onWheel={this.handleWheel}
                        effect="blur"
                        src={element.thumbnail.fluid.src}
                      /> */}

                      <LazyLoad>
                        {/* <img
                          src={`${element.thumbnail.fluid.src}`}
                          srcF={`${element.fullScreenPhoto.fluid.src}`}
                          className={
                            this.state.mouseWheelActive
                              ? `move-right`
                              : `move-left`
                          }
                          onWheel={this.handleWheel}
                          onClick={e =>
                            console.log(
                              (e.target.src = element.fullScreenPhoto.fluid.src)
                            )
                          }
                        /> */}
                        <div
                          onWheel={this.handleWheel}
                          className={`slide-bg-fullscreen
                          ${
                            this.state.mouseWheelActive
                              ? `move-right`
                              : `move-left`
                          }
                          `}
                          css={{
                            backgroundImage: `url(
                              ${element.fullScreenPhoto.fluid.src}
                            )`,
                          }}
                        ></div>

                        {/* <div
                          className={"slide-bg-thumbnail"}
                          css={{
                            backgroundImage: `url(
                              ${element.thumbnail.fluid.src}
                            )`,
                          }}
                        ></div> */}
                      </LazyLoad>

                      <div className={`title-container`}>
                        <h2 className={`project-title-1`}>
                          {element.titlePart1}
                        </h2>
                        <h2 className={`project-title-2`}>
                          {element.titlePart2}
                        </h2>

                        <div className="text-on-hover">
                          <p className="project-slogan">
                            {element.projectSlogan}
                          </p>
                          <p className="read-more">{element.readMore}</p>
                        </div>
                      </div>
                    </TransitionLink>
                    {/* </Link> */}
                  </div>
                </SwiperSlide>
              )
            })}
        </Swiper>
      </main>
    )
  }
}

export default Main
