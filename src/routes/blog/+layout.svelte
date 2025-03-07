<script lang="ts">
  import { page } from "$app/state";

  let { children } = $props();

  let width: number = $state(0);
</script>

<svelte:window bind:outerWidth={width} />

<header>
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
  </nav>
  <p>
    {#if width > 800}cakephone{/if}{page.url.pathname}
  </p>
</header>

<article>
  {@render children()}
</article>
