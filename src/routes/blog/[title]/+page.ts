import type { EntryGenerator } from "./$types";

export async function entries(): Promise<EntryGenerator> {
  let posts: Post[];
  try {
    posts = await (
      await fetch("http://cakephone.github.io/blog/posts.json")
    ).json();
  } catch (e) {
    posts = await (await fetch("http://localhost:5173/blog/posts.json")).json();
  }

<<<<<<< HEAD
  return { title: "about-me" };

=======
>>>>>>> b8993b21edd5f0589e7f8233753dba5ad51b0649
  return posts.map((post) => ({
    title: post.asset_path,
  }));
}

export const prerender = true;
