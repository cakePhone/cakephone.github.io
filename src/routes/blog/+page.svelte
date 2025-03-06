<script lang="ts">
  import { onMount } from "svelte";

  let posts: Post[] = $state([]);

  onMount(async () => {
    const postsResponse = await fetch("/blog/posts.json");
    posts = await postsResponse.json();
  });
</script>

<article>
  <h1>Welcome to my blog!</h1>
  <h3>Feel free to look around.</h3>

  {#each posts as post}
    <div class="post">
      <h4>{post.title}</h4>
      <p>{post.date}</p>
      <p>Tags: {post.tags.join(", ")}</p>
      <a href={`/blog/${post.title}`}>Read more</a>
    </div>
  {/each}
</article>
