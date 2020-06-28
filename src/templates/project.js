import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';

const ProjectTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title="Our Work" description={post.frontmatter.description || post.excerpt}>
      <article>
        <header>
          <h2>{post.frontmatter.title}</h2>
          <p>{post.frontmatter.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <nav className="o-page-nav u-letter-box-super">
        <div className="u-left">
          {previous && (
            <Link className="c-button c-button--ghost c-button--brand" to={previous.fields.slug} rel="prev">
              <i className="fas fa-chevron-left u-small"></i>{` `}
              {previous.frontmatter.title}
            </Link>
          )}
        </div>
        <div className="u-right">
          {next && (
            <Link className="c-button c-button--ghost c-button--brand" to={next.fields.slug} rel="next">
              {next.frontmatter.title}{` `}
              <i className="fas fa-chevron-right u-small"></i>
            </Link>
          )}
        </div>
      </nav>
    </Layout>
  );
};

export default ProjectTemplate;

export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`;
