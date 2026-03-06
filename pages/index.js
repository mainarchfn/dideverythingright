import { useMemo, useState } from "react";
import Link from "next/link";
import Layout from "components/Layout";
import Hero from "components/Hero";
import PostCard from "components/PostCard";
import PreferencePicker from "components/PreferencePicker";
import ExpenseTrendChart from "components/ExpenseTrendChart";
import AdPlaceholder from "components/AdPlaceholder";
import { CATEGORIES, CATEGORY_DETAILS, CATEGORY_LABELS } from "lib/constants";
import { getAllPosts, getPostBySlug } from "lib/posts";

export async function getStaticProps() {
  const posts = getAllPosts();
  const categoryPreview = CATEGORIES.map((category) => {
    const latest = posts.find((post) => post.category === category) || null;
    return {
      key: category,
      label: CATEGORY_LABELS[category],
      intro: CATEGORY_DETAILS[category].intro,
      latest
    };
  });

  return {
    props: {
      posts,
      categoryPreview,
      featuredPost: posts[0] || null,
      urgentPost: getPostBySlug("handling-a-sudden-expense")
    }
  };
}

export default function Home({ posts, categoryPreview, featuredPost, urgentPost }) {
  const [preferences, setPreferences] = useState([]);

  const recommended = useMemo(() => {
    if (!preferences.length) {
      return posts;
    }

    const preferred = posts.filter((post) => preferences.includes(post.category));
    const remaining = posts.filter((post) => !preferences.includes(post.category));
    return [...preferred, ...remaining];
  }, [posts, preferences]);

  return (
    <Layout title="Did Everything Right | Retirement Guidance & Tools">
      <Hero featuredPost={featuredPost} />
      <div className="container stack">
        <section className="panel stack" aria-label="Most urgent update">
          <p className="eyebrow">What&apos;s pressing now</p>
          <h2>Federal tax filing deadline is April 15, 2026</h2>
          <p>
            With today&apos;s date at March 6, 2026, many retirees have about five weeks left. If a tax payment may
            affect medication, housing, or debt plans, review your options this week.
          </p>
          {urgentPost ? <Link href={`/article/${urgentPost.slug}`}>Read the urgent action guide</Link> : null}
        </section>

        <section id="categories" aria-label="Category gateway" className="stack">
          <div className="split-row">
            <h2>Choose your starting category</h2>
          </div>
          <div className="gateway-grid">
            {categoryPreview.map((category) => (
              <article key={category.key} className="gateway-card panel">
                <h3>{category.label}</h3>
                <p>{category.intro}</p>
                {category.latest ? (
                  <p className="small-note">Latest: {category.latest.title}</p>
                ) : (
                  <p className="small-note">Fresh content added weekly.</p>
                )}
                <Link href={`/category/${category.key}`}>Open {category.label}</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="stack" aria-label="Useful tools">
          <h2>Use tools that reduce decision stress</h2>
          <div className="tools-grid">
            <div className="panel stack">
              <h3>Priority topic picker</h3>
              <p className="small-note">
                Select what matters right now so your reading list moves urgent topics to the top.
              </p>
              <PreferencePicker onChange={setPreferences} compact showHeading={false} />
            </div>
            <div className="panel stack">
              <h3>Essential spending quick view</h3>
              <p className="small-note">Use this split as a conversation starter when a sudden bill hits.</p>
              <ExpenseTrendChart />
              <Link href="/category/sudden-expenses">Open financial tools</Link>
            </div>
          </div>
        </section>

        <section aria-label="Recommended articles" className="stack">
          <div className="split-row">
            <h2>Recommended reading</h2>
            <Link className="button-link" href="/subscribe">
              Start membership
            </Link>
          </div>
          <div className="card-grid">
            {recommended.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        <section className="panel membership-panel stack" aria-label="Membership details">
          <h2>Membership: deeper help when you need it</h2>
          <p>
            Free readers get practical articles. Members get advanced tools, weekly deadline alerts, and premium
            templates for calls, appointments, and paperwork.
          </p>
          <p className="small-note">Current offer: first 30 days of membership are free while tools are in rollout.</p>
          <div className="hero-actions">
            <Link className="button-link" href="/subscribe">
              View membership options
            </Link>
            <Link href="/category/health" className="ghost-link">
              Explore an example category
            </Link>
          </div>
        </section>

        <AdPlaceholder label="Trusted local services marketplace slot" />
      </div>
    </Layout>
  );
}
