const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function ensurePostsDir() {
  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }
}

function normalizeSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function postFilePath(slug) {
  return path.join(POSTS_DIR, `${slug}.json`);
}

function validatePostInput(input) {
  const required = [
    "title",
    "slug",
    "summary",
    "category",
    "publishDate",
    "heroImage",
    "body",
    "seo"
  ];

  for (const key of required) {
    if (input[key] === undefined || input[key] === null || input[key] === "") {
      throw new Error(`Missing required field: ${key}`);
    }
  }

  if (typeof input.seo !== "object" || !input.seo.title || !input.seo.description) {
    throw new Error("SEO title and description are required");
  }
}

function getAllPosts({ includeDrafts = false } = {}) {
  ensurePostsDir();
  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith(".json"));
  const posts = files.map((file) => {
    const fullPath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(raw);
  });

  const filtered = includeDrafts ? posts : posts.filter((post) => post.published);
  return filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
}

function getPostBySlug(slug) {
  const filePath = postFilePath(slug);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function upsertPost(input, originalSlug) {
  ensurePostsDir();

  const slug = normalizeSlug(input.slug);
  const payload = {
    ...input,
    slug,
    body: Array.isArray(input.body)
      ? input.body
      : String(input.body)
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean),
    updatedAt: new Date().toISOString()
  };

  validatePostInput(payload);

  if (!payload.createdAt) {
    payload.createdAt = new Date().toISOString();
  }

  const filePath = postFilePath(slug);
  if (originalSlug && originalSlug !== slug) {
    const oldPath = postFilePath(originalSlug);
    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  fs.writeFileSync(filePath, `${JSON.stringify(payload, null, 2)}\n`);
  return payload;
}

function deletePost(slug) {
  const filePath = postFilePath(slug);
  if (!fs.existsSync(filePath)) {
    return false;
  }
  fs.unlinkSync(filePath);
  return true;
}

module.exports = {
  normalizeSlug,
  getAllPosts,
  getPostBySlug,
  upsertPost,
  deletePost
};
