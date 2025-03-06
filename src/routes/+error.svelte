<script>
  import { page } from "$app/state";
</script>

<article>
  <h1>{page.status}: {page?.error?.message}</h1>
</article>
