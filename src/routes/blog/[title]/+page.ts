import type { EntryGenerator } from "./$types";

export async function entries() {
  let posts: Post[];
  try {
    posts = await (
      await fetch("http://cakephone.github.io/blog/posts.json")
    ).json();
  } catch (e) {
    try {
      posts = await (
        await fetch("http://localhost:5173/blog/posts.json")
      ).json();
    } catch (e) {
      posts = [];
    }
  }

  return posts.map((post) => ({
    title: post.asset_path,
  }));
}

export const prerender = true;
