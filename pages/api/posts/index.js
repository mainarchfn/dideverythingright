const { getAllPosts, upsertPost } = require("lib/posts");

export default function handler(req, res) {
  try {
    if (req.method === "GET") {
      const includeDrafts = req.query.includeDrafts === "1";
      const posts = getAllPosts({ includeDrafts });
      return res.status(200).json({ posts });
    }

    if (req.method === "POST") {
      const post = upsertPost(req.body);
      return res.status(201).json({ post });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
