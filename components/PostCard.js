import Link from "next/link";
import CategoryPill from "components/CategoryPill";

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

export default function PostCard({ post }) {
  const readMinutes = Math.max(3, Math.ceil(post.body.join(" ").split(" ").length / 180));

  return (
    <article className="post-card">
      <img src={post.heroImage} alt={`Illustration for ${post.title}`} />
      <div className="post-card-body">
        <CategoryPill category={post.category} />
        <p className="post-meta">
          {formatDate(post.publishDate)} | {readMinutes} min read
        </p>
        <h3>
          <Link href={`/article/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.summary}</p>
      </div>
    </article>
  );
}
