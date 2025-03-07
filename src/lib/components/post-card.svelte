<script lang="ts">
  let post: { post: Post } = $props();
</script>

<div class="post-card">
  <a href={`/blog/${post.post.asset_path}`}>
    <div class="inline">
      <h4>{post.post.title}</h4>
      <p class="tags">{post.post.tags.join(", ")}</p>
      <p>{post.post.date}</p>
    </div>
  </a>
</div>

<style>
  .post-card {
    border: dashed 3px var(--accent);
    border-radius: 1rem;
    padding-block: 0.75rem;
    padding-inline: 1rem;

    transition: border-color 0.1s ease-in-out;
  }

  .post-card:hover,
  .post-card:focus {
    border-color: var(--on-surface-headings);
  }

  .inline {
    display: flex;
    flex-wrap: wrap;

    gap: 0.1rem 1rem;
  }

  .inline * {
    margin-block: 0;
  }

  .tags {
    opacity: 0.7;
  }

  h4 {
    padding-top: 0.1rem;
    height: 1.5rem;
    font-size: inherit;
  }

  p {
    margin-block: 0.8rem;
    font-size: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    text-decoration: underline;
  }
  a:active {
    text-decoration: none;
  }
  a:visited {
    color: inherit;
  }
  a:focus {
    outline: none;
  }
</style>
