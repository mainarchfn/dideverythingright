import Layout from "components/Layout";
import CategoryPill from "components/CategoryPill";
import ExpenseTrendChart from "components/ExpenseTrendChart";
import AdPlaceholder from "components/AdPlaceholder";
import { getAllPosts, getPostBySlug } from "lib/posts";

export async function getStaticPaths() {
  const posts = getAllPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);

  if (!post || !post.published) {
    return { notFound: true };
  }

  return {
    props: {
      post
    }
  };
}

export default function ArticlePage({ post }) {
  return (
    <Layout title={post.seo.title} description={post.seo.description}>
      <article className="container article stack">
        <h1>{post.title}</h1>
        <p className="lede">{post.summary}</p>
        <CategoryPill category={post.category} />
        <img src={post.heroImage} alt="" aria-hidden="true" className="hero-image" />
        <div className="article-body stack">
          {post.body.map((paragraph, index) => (
            <p key={`${post.slug}-${index}`}>{paragraph}</p>
          ))}
          {post.embedChart ? <ExpenseTrendChart /> : null}
        </div>
        <AdPlaceholder label="Retirement planning sponsor slot" />
      </article>
    </Layout>
  );
}
