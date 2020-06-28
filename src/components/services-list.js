import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Slider from 'react-slick';

const ServicesList = () => {
  const data = useStaticQuery(graphql`
    query ServicesList {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/services/" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            excerpt
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `);

  const services = data.allMarkdownRemark.edges;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <section className="o-container o-container--medium">
      <h2 className="c-heading c-heading--secondary">Our Services</h2>
      <Slider {...settings}>
        {services.map(({ node: { frontmatter } }, i) => {
          return (
            <div className="c-slide u-letter-box-small" key={frontmatter.title + i}>
              <h2 className="c-slide__heading u-super u-centered">{frontmatter.title}</h2>
              <div className="c-slide__text u-italic u-centered">{frontmatter.description}</div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default ServicesList;
