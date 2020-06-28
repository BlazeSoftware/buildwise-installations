import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

const ProjectList = () => {
  const data = useStaticQuery(graphql`
    query ProjectList {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/projects/" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              description
            }
          }
        }
      }
    }
  `);

  const projects = data.allMarkdownRemark.edges;

  return projects.map(({ node: { fields, frontmatter, excerpt } }, i) => (
    <Link key={fields.slug} className="c-project-link" to={fields.slug}>
      <div className="c-project-link__title">
        <h3 className="c-heading">{frontmatter.title}</h3>
      </div>
      <div className="c-project-link__description">
        <span>{frontmatter.description || excerpt}</span>
      </div>
    </Link>
  ));
};

export default ProjectList;
