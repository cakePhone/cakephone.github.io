<script lang="ts">
  import { page } from "$app/state";

  let { children } = $props();
</script>

<header>
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
  </nav>
  <p>cakephone{page.url.pathname}</p>
</header>

<article>
  {@render children()}
</article>
