import type { EntryGenerator } from "./$types";

export async function entries(): Promise<EntryGenerator> {
  return { title: "about-me" };
  let posts: Post[];
  try {
    posts = await (
      await fetch("http://cakephone.github.io/blog/posts.json")
    ).json();
  } catch (e) {
    posts = await (await fetch("http://localhost:5173/blog/posts.json")).json();
  }

  // return posts.map((post) => ({
  //   title: post.asset_path,
  // }));
}

export const prerender = true;
