import Link from "next/link";
import CategoryPill from "components/CategoryPill";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default function PostCard({ post, compact = false }) {
  const readMinutes = Math.max(3, Math.ceil(post.body.join(" ").split(" ").length / 180));
  const cardClass = compact ? "post-card post-card-compact" : "post-card";

  return (
    <article className={cardClass}>
      <img src={post.heroImage} alt={`Illustration for ${post.title}`} />
      <div className="post-card-body">
        <p className="post-meta">
          {formatDate(post.publishDate)} | {readMinutes} min read
        </p>
        <h3>
          <Link href={`/article/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.summary}</p>
        <CategoryPill category={post.category} />
      </div>
    </article>
  );
}
