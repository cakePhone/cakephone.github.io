import { error } from "@sveltejs/kit";
import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

export async function load({ params }) {
  try {
    let { title } = params;

    let posts: Post[] = await (
      await fetch("http://localhost:5173/blog/posts.json")
    ).json();

    let post = posts.find((post) => post.asset_path === title);

    if (!post) {
      error(404, `Post not found`);
    }

    let content = await fetch(
      `http://localhost:5173/blog/${post.asset_path}/post.md`,
    );

    if (!content.ok) {
      error(404, `Post content not found`);
    }
    let text = await content.text();
    let html = DOMPurify.sanitize(await marked.parse(text));

    return { html };
  } catch (err) {
    console.error(err);
    error(404, `Post not found: ${params.title}`);
  }
}
