import React from "react";
import ErrorPage from "next/error";
import { useRouter } from "next/router";
import CoverImage from "./md/CoverImage";
import markdownStyles from "./markdownStyles.module.css";
import ReactMarkdown from 'react-markdown'

// renderers
import { Code } from './md/renderers'

const BlogPost = ({ pid, post, morePosts }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <article>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={post.title} src={post.coverImage} slug={post.slug} />
      </div>
      <h1>{post.title}</h1>
      <p>By {post.author}</p>
      <ReactMarkdown source={post.content} renderers={{ code: Code }} />
    </article>
  );
};

export default BlogPost;
