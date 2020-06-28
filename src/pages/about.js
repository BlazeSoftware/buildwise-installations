import React from 'react';

import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';

const AboutPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query AboutQuery {
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/about/" } } }) {
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
    </Layout>
  );
};

export default AboutPage;
