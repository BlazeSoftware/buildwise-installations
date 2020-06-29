import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ProjectLink from './project-link';

const LatestProject = () => {
  const data = useStaticQuery(graphql`
    query LatestProject {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        filter: { fields: { slug: { regex: "^/projects/" } } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1
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
              featuredImage {
                childImageSharp {
                  fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const project = data.allMarkdownRemark.edges[0];

  const renderProject = () => {
    const {
      node: { fields, frontmatter, excerpt },
    } = project;
    const props = {
      slug: fields.slug,
      title: frontmatter.title,
      featuredImage: frontmatter.featuredImage,
      description: frontmatter.description || excerpt,
    };

    return <ProjectLink {...props} />;
  };

  return (
    <section>
      <h2 className="c-heading c-heading--secondary">Latest Project</h2>
      <div>{renderProject()}</div>
    </section>
  );
};

export default LatestProject;
