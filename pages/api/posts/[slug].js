const { getPostBySlug, upsertPost, deletePost } = require("lib/posts");

export default function handler(req, res) {
  const { slug } = req.query;

  try {
    if (req.method === "GET") {
      const post = getPostBySlug(slug);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.status(200).json({ post });
    }

    if (req.method === "PUT") {
      const post = upsertPost(req.body, slug);
      return res.status(200).json({ post });
    }

    if (req.method === "DELETE") {
      const removed = deletePost(slug);
      if (!removed) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
