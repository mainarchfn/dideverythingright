import { useMemo, useState } from "react";
import Layout from "components/Layout";
import { CATEGORIES, CATEGORY_LABELS } from "lib/constants";

const blankPost = {
  title: "",
  slug: "",
  summary: "",
  category: "health",
  publishDate: new Date().toISOString().slice(0, 10),
  heroImage: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
  body: "",
  seoTitle: "",
  seoDescription: "",
  published: false,
  embedChart: false
};

function postToForm(post) {
  return {
    title: post.title || "",
    slug: post.slug || "",
    summary: post.summary || "",
    category: post.category || "health",
    publishDate: (post.publishDate || "").slice(0, 10),
    heroImage: post.heroImage || "",
    body: Array.isArray(post.body) ? post.body.join("\n") : post.body || "",
    seoTitle: post.seo?.title || "",
    seoDescription: post.seo?.description || "",
    published: Boolean(post.published),
    embedChart: Boolean(post.embedChart)
  };
}

function formToPayload(form) {
  return {
    title: form.title,
    slug: form.slug,
    summary: form.summary,
    category: form.category,
    publishDate: form.publishDate,
    heroImage: form.heroImage,
    body: form.body,
    seo: {
      title: form.seoTitle,
      description: form.seoDescription
    },
    published: form.published,
    embedChart: form.embedChart
  };
}

export async function getServerSideProps() {
  const { getAllPosts } = require("lib/posts");
  const posts = getAllPosts({ includeDrafts: true });
  return { props: { initialPosts: posts } };
}

export default function AdminPage({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedSlug, setSelectedSlug] = useState("");
  const [form, setForm] = useState(blankPost);
  const [status, setStatus] = useState("");

  const activePost = useMemo(() => posts.find((post) => post.slug === selectedSlug), [posts, selectedSlug]);

  function handleEdit(post) {
    setSelectedSlug(post.slug);
    setForm(postToForm(post));
    setStatus(`Editing ${post.title}`);
  }

  function resetForm() {
    setSelectedSlug("");
    setForm(blankPost);
    setStatus("Ready for new draft");
  }

  async function refreshPosts() {
    const response = await fetch("/api/posts?includeDrafts=1");
    const data = await response.json();
    setPosts(data.posts || []);
  }

  async function savePost(event) {
    event.preventDefault();
    const payload = formToPayload(form);
    const method = selectedSlug ? "PUT" : "POST";
    const endpoint = selectedSlug ? `/api/posts/${selectedSlug}` : "/api/posts";

    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      setStatus(`Error: ${data.error}`);
      return;
    }

    setSelectedSlug(data.post.slug);
    setForm(postToForm(data.post));
    setStatus("Saved. If published, rebuild to include in static pages.");
    await refreshPosts();
  }

  async function removePost(slug) {
    if (!window.confirm("Delete this post?")) {
      return;
    }

    const response = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json();
      setStatus(`Error: ${data.error}`);
      return;
    }

    if (selectedSlug === slug) {
      resetForm();
    }

    setStatus("Post deleted");
    await refreshPosts();
  }

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  return (
    <Layout title="Writer CMS | Did Everything Right">
      <section className="container stack admin-layout">
        <h1>Writer CMS</h1>
        <p>Create, edit, preview, categorize, and publish posts without touching code.</p>
        <p className="small-note">{status}</p>

        <div className="admin-columns">
          <aside className="panel stack" aria-label="Existing posts">
            <h2>Post library</h2>
            <button type="button" onClick={resetForm}>
              New draft
            </button>
            {posts.map((post) => (
              <div key={post.slug} className="list-item">
                <button type="button" onClick={() => handleEdit(post)}>
                  {post.title}
                </button>
                <span>{post.published ? "Published" : "Draft"}</span>
                <button type="button" className="danger" onClick={() => removePost(post.slug)}>
                  Delete
                </button>
              </div>
            ))}
          </aside>

          <form className="panel stack" onSubmit={savePost}>
            <h2>{selectedSlug ? "Edit post" : "Create post"}</h2>

            <label htmlFor="title">Title</label>
            <input id="title" value={form.title} onChange={(e) => updateField("title", e.target.value)} required />

            <label htmlFor="slug">Slug</label>
            <input id="slug" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} required />

            <label htmlFor="summary">Summary</label>
            <textarea id="summary" value={form.summary} onChange={(e) => updateField("summary", e.target.value)} required />

            <label htmlFor="category">Category</label>
            <select id="category" value={form.category} onChange={(e) => updateField("category", e.target.value)}>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {CATEGORY_LABELS[category]}
                </option>
              ))}
            </select>

            <label htmlFor="publishDate">Publish date</label>
            <input
              id="publishDate"
              type="date"
              value={form.publishDate}
              onChange={(e) => updateField("publishDate", e.target.value)}
              required
            />

            <label htmlFor="heroImage">Hero image URL</label>
            <input
              id="heroImage"
              value={form.heroImage}
              onChange={(e) => updateField("heroImage", e.target.value)}
              required
            />

            <label htmlFor="body">Body content (one paragraph per line)</label>
            <textarea id="body" value={form.body} onChange={(e) => updateField("body", e.target.value)} rows={8} required />

            <label htmlFor="seoTitle">SEO title</label>
            <input
              id="seoTitle"
              value={form.seoTitle}
              onChange={(e) => updateField("seoTitle", e.target.value)}
              required
            />

            <label htmlFor="seoDescription">SEO description</label>
            <textarea
              id="seoDescription"
              value={form.seoDescription}
              onChange={(e) => updateField("seoDescription", e.target.value)}
              required
            />

            <label className="check-row">
              <input
                type="checkbox"
                checked={form.embedChart}
                onChange={(e) => updateField("embedChart", e.target.checked)}
              />
              Embed chart in article
            </label>

            <label className="check-row">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => updateField("published", e.target.checked)}
              />
              Publish this post
            </label>

            <button type="submit">Save post</button>
          </form>

          <aside className="panel stack" aria-label="Preview">
            <h2>Preview</h2>
            <p><strong>{form.title || "Untitled"}</strong></p>
            <p>{form.summary || "Summary preview"}</p>
            <p className="small-note">/{form.slug || "slug"}</p>
            <p className="small-note">{form.publishDate || "No publish date"}</p>
            <p>{form.body.split("\n").filter(Boolean).slice(0, 3).join(" ") || "Body preview"}</p>
            <p className="small-note">{activePost?.published ? "Currently published" : "Currently draft"}</p>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
