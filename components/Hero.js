import Link from "next/link";
import { CATEGORY_LABELS } from "lib/constants";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

export default function Hero({ featuredPost }) {
  const category = featuredPost ? CATEGORY_LABELS[featuredPost.category] : "";

  return (
    <section className="hero-wrap">
      <div className="hero container">
        <div className="hero-main stack">
          <p className="eyebrow">Built for retirees who need clear next steps now</p>
          <h1>Information, tools, and steady guidance for life&apos;s hardest moments</h1>
          <p>
            Explore practical articles, decision helpers, and timely alerts across health, finances,
            injuries, and veterans support.
          </p>
          <div className="hero-actions">
            <Link className="button-link" href="/subscribe">
              Explore membership tools
            </Link>
            <a href="#categories" className="ghost-link">
              Browse categories
            </a>
          </div>
        </div>
        {featuredPost ? (
          <aside className="hero-highlight panel" aria-label="Latest content highlight">
            <p className="eyebrow">Latest highlight</p>
            <h2>{featuredPost.title}</h2>
            <p>{featuredPost.summary}</p>
            <p className="small-note">
              {category} | Updated {formatDate(featuredPost.publishDate)}
            </p>
            <Link href={`/article/${featuredPost.slug}`}>Read this now</Link>
          </aside>
        ) : null}
      </div>
    </section>
  );
}
