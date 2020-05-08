import React from 'react'
import Layout from '../../../components/Layout'
import BlogList from '../../../components/BlogList'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getLocalizationProps, LanguageProvider } from '../../../context/LanguageContext'
import matter from 'gray-matter'

const BlogIndexPage = ({ localization, posts }) => {
  return (
    <LanguageProvider localization={localization}>
      <Layout
        title="Biscui.Tech"
        description="Biscui.Tech Home page"
      >
        <BlogList posts={posts} />
      </Layout>
    </LanguageProvider>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const posts = ((context) => {
    const keys = context.keys()
    const values = keys.map(context)

    const data = keys.map((key, index) => {
      let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3)
      const value = values[index]
      const document = matter(value.default)
      return {
        frontmatter: document.data,
        markdownBody: document.content,
        slug,
      }
    })
    return data
    //@ts-ignore
  })(require.context('../../../blog', true, /\.md$/))

  const localization = getLocalizationProps(ctx, 'blog');
  return {
    props: {
      posts,
      localization,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["en", "fr"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export default BlogIndexPage