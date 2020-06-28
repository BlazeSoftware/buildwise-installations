import React from 'react';

import Layout from '../components/layout';
import { useStaticQuery, graphql } from 'gatsby';
import ServicesList from '../components/services-list';

const HomePage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query HomeQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      allMarkdownRemark(filter: { fields: { slug: { regex: "^/site/home/" } } }) {
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
    <Layout location={location} title={title} description={description || data.site.siteMetadata.description}>
      <section dangerouslySetInnerHTML={{ __html: html }} />
      <div className="u-letter-box-small">
        {/* <ServicesList /> */}
      </div>
    </Layout>
  );
};

export default HomePage;
