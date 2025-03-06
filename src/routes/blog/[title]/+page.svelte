<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { marked } from "marked";
  import DOMPurify from "isomorphic-dompurify";

  let html: string = "";

  onMount(async () => {
    try {
      const response = await fetch(`/blog/${page.params.title}/post.md`);

      if (!response.ok) throw new Error("404: Post not found");

      const data = await response.text();
      html = DOMPurify.sanitize(await marked.parse(data));
    } catch (error) {
      html = error as string;
    }
  });
</script>

{@html html}
