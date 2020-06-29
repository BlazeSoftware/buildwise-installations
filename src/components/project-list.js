import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import ProjectLink from './project-link';

const ProjectList = () => {
  const data = useStaticQuery(graphql`
    query ProjectList {
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

  const projects = data.allMarkdownRemark.edges;

  return (
    <section>
      <h2 className="c-heading c-heading--secondary">Previous Projects</h2>
      <div>
        {projects.map(({ node: { fields, frontmatter, excerpt } }) => {
          const props = {
            slug: fields.slug,
            title: frontmatter.title,
            featuredImage: frontmatter.featuredImage,
            description: frontmatter.description || excerpt,
          };

          return <ProjectLink {...props} />;
        })}
      </div>
    </section>
  );
};

export default ProjectList;
