import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const ProjectLink = ({ slug, title, description, featuredImage }) => (
  <Link className="c-project-link" to={slug}>
    <div className="c-project-link__title">
      <h2 className="c-heading">{title}</h2>
    </div>
    {featuredImage && featuredImage.childImageSharp && <Img className="c-project-link__image" fluid={featuredImage.childImageSharp.fluid} alt={title} />}
    <div className="c-project-link__description">
      <span>{description}</span>
    </div>
  </Link>
);

export default ProjectLink;
