import React, { useEffect, useContext } from "react"
import { Link, graphql } from "gatsby"
import Menu from "../components/Menu/menu"
import Header from "../components/Header/header"

import myContext from "../../context"

const About = props => {
  let {
    about,
    menuRightProject,
    menuLeftProject,
    houseProject,
    interiorProject,
    category,
    offer,
  } = props.data

  const context = useContext(myContext)

  useEffect(() => {
    context.navToggled ? context.handleNavToggle() : console.log("nav open")
  }, [])

  console.log(props.transitionStatus)

  return (
    <>
      <Header logoLight />
      <Menu
        dataMenu={menuRightProject}
        dataMenuLeft={menuLeftProject}
        about={about}
        houseProject={houseProject}
        interiorProject={interiorProject}
        category={category}
        offer={offer}
      />

      <div
        className={`subpage about ${
          props.transitionStatus === `entered` ? `about-entered` : ``
        }`}
        css={{
          backgroundImage: `url(${about.aboutBackground.fluid.src})`,
          backgroundSize: `cover`,
        }}
      >
        <div
          className={`subpage-content-wrapper ${
            props.transitionStatus === `entered`
              ? `subpage-content-entered`
              : ``
          }`}
        >
          <h1
            className={`about-header ${
              props.transitionStatus === `entered` ? `about-header-entered` : ``
            }`}
          >
            {about.aboutTitle}
          </h1>
          <p
            className={`about-content ${
              props.transitionStatus === `entered`
                ? `about-content-entered`
                : ``
            }`}
          >
            {about.aboutContent}
          </p>
        </div>
      </div>
    </>
  )
}

export default About

export const query = graphql`
  query aboutData($locale: String!) {
    about: datoCmsAbout(locale: { eq: $locale }) {
      aboutTitle
      aboutContent
      aboutBackground {
        fluid {
          src
        }
      }
      slug
      locale
    }
    menuRightProject: datoCmsMenuRight(locale: { eq: $locale }) {
      adressData1
      adressData2
      phoneNumber
      emailAdress
      behanceLink
      facebookLink
      elloCoLink
      instagramLink
    }
    menuLeftProject: datoCmsMenuLeft(locale: { eq: $locale }) {
      projectsHeader
      offerHeader

      aboutHeader

      contactHeader
    }

    houseProject: datoCmsHouseProjectForClient(locale: { eq: $locale }) {
      pageName
      slug
      locale
      modularContent {
        slideNumber
        slideHeader
        slideMainText
      }
    }
    interiorProject: datoCmsInteriorProjectForClient(locale: { eq: $locale }) {
      pageName
      slug
      locale
      modularContent {
        slideNumber
        slideHeader
        slideMainText
      }
    }
    category: datoCmsCategory(locale: { eq: $locale }) {
      categoryFirstSlug
      categorySecondSlug
      locale
    }

    offer: datoCmsOffer(locale: { eq: $locale }) {
      locale
      slug
    }
  }
`
