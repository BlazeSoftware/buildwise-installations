import React from 'react';

import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import ProjectList from '../components/project-list';

const ProjectsPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query ProjectsQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/work/" } } }) {
        edges {
          node {
            frontmatter {
              title
              description
            }
            html
          }
        }
      }
    }
  `);
  const {
    frontmatter: { title, description },
    html,
  } = data.allMarkdownRemark.edges[0].node;

  return (
    <Layout location={location} title={title} description={description}>
      <section dangerouslySetInnerHTML={{ __html: html }} />
      <div className="u-letter-box-small">
        <ProjectList />
      </div>
    </Layout>
  );
};

export default ProjectsPage;
