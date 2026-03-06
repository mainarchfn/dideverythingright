import Link from "next/link";
import Layout from "components/Layout";
import PostCard from "components/PostCard";
import CategoryIcon from "components/CategoryIcon";
import CategoryToolbox from "components/CategoryToolbox";
import {
  CATEGORIES,
  CATEGORY_DETAILS,
  CATEGORY_LABELS
} from "lib/constants";
import { getAllPosts } from "lib/posts";

export async function getStaticPaths() {
  return {
    paths: CATEGORIES.map((category) => ({ params: { category } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const posts = getAllPosts().filter((post) => post.category === params.category);
  const featured = posts[0] || null;
  const secondary = posts[1] || null;

  return {
    props: {
      category: params.category,
      posts,
      featured,
      secondary
    }
  };
}

export default function CategoryPage({ category, posts, featured, secondary }) {
  const label = CATEGORY_LABELS[category] || category;
  const details = CATEGORY_DETAILS[category];
  const topStories = posts.slice(0, 3);

  return (
    <Layout title={`${label} guidance | Did Everything Right`}>
      <section className="container category-page stack">
        <header className="category-hero panel stack">
          <p className="eyebrow">{label} support center</p>
          <h1 className="category-title-row">
            <CategoryIcon category={category} decorative={false} />
            <span>{label}</span>
          </h1>
          <p>{details?.intro}</p>
          <p className="small-note">What you will find: {details?.whatToFind}</p>
        </header>

        <section className="panel stack" aria-label="Time-sensitive alert">
          <p className="eyebrow">Time-sensitive update</p>
          <h2>{details?.urgent.title}</h2>
          <p>{details?.urgent.body}</p>
          <p className="small-note">Date to note: {details?.urgent.dateLabel}</p>
          {featured ? <Link href={`/article/${featured.slug}`}>Read related action guide</Link> : null}
        </section>

        <section className="stack" aria-label="Most important articles">
          <h2>Most important {label.toLowerCase()} articles</h2>
          <div className="card-grid">
            {topStories.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="panel stack" aria-label="Most used tools for this category">
          <h2>Most used tools for {label.toLowerCase()}</h2>
          <CategoryToolbox category={category} tools={details?.tools || []} />
        </section>

        <section className="panel stack" aria-label="Another urgent read">
          <h2>Read this next while it is still timely</h2>
          <p>
            Rules, enrollment windows, and filing dates can close quickly. This guide is the best next step if you
            only have 10 minutes today.
          </p>
          {secondary ? (
            <Link href={`/article/${secondary.slug}`}>{secondary.title}</Link>
          ) : featured ? (
            <Link href={`/article/${featured.slug}`}>{featured.title}</Link>
          ) : null}
        </section>

        <section className="panel membership-panel stack" aria-label="Membership offer">
          <h2>Member deal for {label.toLowerCase()} support</h2>
          <p>
            Join now for premium templates, deadline reminders, and printable call scripts tailored to this category.
          </p>
          <p className="small-note">Deal: first month free, then member pricing begins.</p>
          <Link className="button-link cta-membership" href="/membership">
            Claim the membership offer
          </Link>
        </section>

        <section className="stack" aria-label="All category articles">
          <h2>All {label.toLowerCase()} articles</h2>
          <div className="card-grid card-grid-compact">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        </section>
      </section>
    </Layout>
  );
}
