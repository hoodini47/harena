import React from "react"
import { Link, graphql, Img } from "gatsby"
import { LazyLoadImage } from "react-lazy-load-image-component"

import Header from "../components/Header/header"
import Menu from "../components/Menu/menu"

import myContext from "../../context"

class allProjectsHouse extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: this.props.data.menuRightIndex.locale,
    }
  }

  componentDidMount() {
    this.context.navToggled
      ? this.context.handleNavToggle()
      : console.log("nav open")

    // const projectCategoryMenu = document.querySelector(
    //   ".projects-category-menu"
    // )

    // setTimeout(() => {
    //   projectCategoryMenu.classList.add("projects-category-menu-mounted")
    // }, 0)
  }

  render() {
    let {
      projects,
      menuRightIndex,
      menuLeftIndex,
      about,
      logoData,
      houseProject,
      interiorProject,
      category,
      offer,
    } = this.props.data

    const menuStyle = `menuStyleAbsolute`

    return (
      <>
        <Header />
        <Menu
          dataMenu={menuRightIndex}
          dataMenuLeft={menuLeftIndex}
          dataProjects={projects}
          menuStyle={menuStyle}
          about={about}
          logoData={logoData}
          houseProject={houseProject}
          interiorProject={interiorProject}
          category={category}
          offer={offer}
        />

        <main className={`all-grid`}>
          <div className="all-grid-bg">
            {projects.nodes
              .filter(node => {
                return node.projectCategory === category.categoryFirstSlug
              })
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
              .map((element, index) => (
                <div className={`single-project-tile`} key={index}>
                  <Link
                    to={
                      element.locale === "pl"
                        ? `/${element.projectCategory}/${element.slug}`
                        : `/${element.locale}/${element.projectCategory}/${element.slug}`
                    }
                    key={index}
                  >
                    {/* <Img fluid={element.thumbnail.fluid} /> */}

                    <LazyLoadImage
                      // alt={image.alt}
                      // height={image.height}
                      effect="blur"
                      src={element.fullScreenPhoto.fluid.src} // use normal <img> attributes as props
                      // width={image.width}
                      style={{
                        transitionDelay: `${0 + index / 10}s`,
                      }}
                    />

                    <div className={`title-container`}>
                      <h2 className={`project-title-1`}>
                        {element.titlePart1}
                      </h2>
                      {/* <h2 className={`project-title-2`}>
                        {element. }
                      </h2> */}

                      <div className="text-on-hover">
                        <p className="project-slogan">
                          {element.projectSlogan}
                        </p>
                        <p className="read-more">{element.readMore}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </main>
        {/* <div className="projects-category-menu">
          <div className="project-category-wrapper">
            <Link
              to={
                category.locale === "pl"
                  ? `/${category.categoryFirstSlug}`
                  : `/${about.locale}/${category.categoryFirstSlug}`
              }
            >
              <p className={`project-subfield`}>{category.categoryFirstName}</p>
            </Link>
            <span className={`lang-separator`}>|</span>
            <Link
              to={
                category.locale === "pl"
                  ? `/${category.categorySecondSlug}`
                  : `/${about.locale}/${category.categorySecondSlug}`
              }
            >
              <p className={`project-subfield`}>
                {category.categorySecondName}
              </p>
            </Link>
          </div>
        </div> */}
      </>
    )
  }
}

allProjectsHouse.contextType = myContext

export default allProjectsHouse

export const query = graphql`
  query allProjectsHouseData($locale: String!) {
    projects: allDatoCmsProject(filter: { locale: { eq: $locale } }) {
      nodes {
        slug
        locale
        id
        position
        projectCategory
        titlePart1

        readMore
        projectSlogan
        fullScreenPhoto {
          fluid {
            src
            base64
            srcSet
          }
        }
        projectDescription
        priceText
        areaValue
      }
    }
    menuRightIndex: datoCmsMenuRight(locale: { eq: $locale }) {
      adressData1
      adressData2
      phoneNumber
      emailAdress
      behanceLink
      facebookLink
      elloCoLink
      instagramLink
    }

    menuLeftIndex: datoCmsMenuLeft(locale: { eq: $locale }) {
      projectsHeader
      offerHeader

      aboutHeader

      contactHeader
      locale
    }

    about: datoCmsAbout(locale: { eq: $locale }) {
      aboutTitle
      aboutContent
      slug
      locale
    }

    logoData: datoCmsHeaderLogoLight {
      logoImage {
        fixed {
          base64
          src
        }
      }
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
      categoryFirstName
      categorySecondSlug
      categorySecondName
      locale
    }

    offer: datoCmsOffer(locale: { eq: $locale }) {
      locale
      slug
    }
  }
`
