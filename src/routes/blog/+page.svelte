<script lang="ts">
  import PostCard from "$lib/components/post-card.svelte";
  import { onMount } from "svelte";

  let posts: Post[] = $state([]);

  onMount(async () => {
    const postsResponse = await fetch("/blog/posts.json");
    posts = await postsResponse.json();
  });

  $inspect(posts);
</script>

<h1>Welcome to my blog!</h1>
<p>Feel free to look around.</p>

<div class="container">
  {#if posts.length != 0}
    {#each posts as post}
      <PostCard {post} />
    {/each}
  {/if}
</div>

<style>
  .container {
    display: grid;
    gap: 0.5rem;
  }
</style>
