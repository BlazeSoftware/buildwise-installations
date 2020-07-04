import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from './seo';

const Layout = ({ children, title, description }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      logo: file(relativePath: { eq: "logo.png" }) {
        childImageSharp {
          fluid(maxWidth: 85, maxHeight: 85) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logoLarge: file(relativePath: { eq: "logo-large.png" }) {
        childImageSharp {
          fluid(maxWidth: 180) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <div className="o-page o-container o-container--medium u-text">
      <SEO title={title} description={description} />
      <header className="c-header">
        <div className="o-logo--large u-display-none@medium">
          <Link activeClassName="active" to={`/`}>
            <Img style={{ width: `180px` }} fluid={data.logoLarge.childImageSharp.fluid} />
          </Link>
        </div>
        <nav className="c-header__nav">
          <Link activeClassName="active" to={`/`}>
            Home
          </Link>
          <Link activeClassName="active" to={`/projects`}>
            Projects
          </Link>
          <Link className="u-display-none u-display-block@medium" to={`/`}>
            <Img style={{ maxWidth: `85px` }} fluid={data.logo.childImageSharp.fluid} />
          </Link>
          <Link activeClassName="active" to={`/about`}>
            About
          </Link>
          <Link activeClassName="active" to={`/contact`}>
            Contact
          </Link>
        </nav>
        <h1 className="c-heading c-heading--title u-centered">{title}</h1>
        {description && <h2 className="c-heading c-heading--sub">{description}</h2>}
        <hr />
      </header>
      <main className="u-letter-box-super">{children}</main>
      <footer className="o-footer">
        <div>
          <div>
            <i className="c-icon fas fa-envelope"></i>
            <a className="c-link" href="mailto:info@buildwise-installations.co.uk">
              info@buildwise-installations.co.uk
            </a>
          </div>
          <div>
            <i className="c-icon fas fa-phone"></i>
            <a className="c-link" href="tel:0113 2641453">
              0113 2641453
            </a>
          </div>
        </div>
        <div className="u-display-none u-display-block@medium">
          <Img style={{ width: `180px` }} fluid={data.logoLarge.childImageSharp.fluid} />
        </div>
      </footer>
    </div>
  );
};

export default Layout;
