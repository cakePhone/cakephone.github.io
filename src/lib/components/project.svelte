<script lang="ts">
    import { onMount } from "svelte";

  export let title: string = "";
  export let description: string = "";

  export let href: string | null;
  export let github: string | null;

  export let image: string;

  export let accent: string = "#787896";
  export let onAccent: string = "#000000";
  export let onSurface: string = "#FFFFFF";
</script>

<div
  id="main" style="--image: url({image}); --project-accent: {accent}; --on-project-accent: {onAccent}; --on-project-surface: {onSurface};"
>
  <div id="gradient-background">
    <h3>{title}</h3>
    <p class="description">{description}</p>
    <div id="links">
      {#if href}
        <a class="visit" {href} target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25v-1.5a.75.75 0 0 1 1.5 0v1.5A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2h1.5a.75.75 0 0 1 0 1.5zM8 2.75A.75.75 0 0 1 8.75 2h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V4.561l-3.22 3.22A.75.75 0 1 1 8.22 6.72l3.22-3.22H8.75A.75.75 0 0 1 8 2.75"/></svg>
          Visit
        </a>
      {/if}
      {#if github}
        <a class="github" href={github} target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.75 14.25s-.5-2 .5-3c0 0-2 0-3.5-1.5s-1-4.5 0-5.5c-.5-1.5.5-2.5.5-2.5s1.5 0 2.5 1c1-.5 3.5-.5 4.5 0c1-1 2.5-1 2.5-1s1 1 .5 2.5c1 1 1.5 4 0 5.5s-3.5 1.5-3.5 1.5c1 1 .5 3 .5 3m-5-.5c-1.5.5-3-.5-3.5-1"/></svg>
          Github
        </a>
      {/if}
    </div>
  </div>
</div>

<style>
  h3 {
    margin: 0;
    line-height: 1.5rem;
    color: var(--project-accent);
  }

  p.description.description {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--on-project-surface);
    text-align: left;
    line-height: normal;
  }

  a, a.visit.visit {
    text-decoration: none;
    color: var(--on-project-accent);

    display: flex;
    align-items: baseline;
    gap: 0.5rem;

    width: fit-content;

    padding: 0.8rem 1rem 0;
    border-radius: 0.5rem;

    background-color: var(--project-accent);

    font-family: var(--ff-headings);
    box-shadow: 0 0 10px rgb(255 255 255 / 0.5);
  }

  svg {
    position: relative;
    --size: 1.2rem;

    height: var(--size);
    width: var(--size);

    top: 2px;
  }

  a.github {
    color: white;
    background-color: #000000;
  }

  #main {
    position: relative;

    height: 100%;
    min-width: 100%;

    border-radius: 0.5rem;
    overflow: hidden;
    scroll-snap-align: start;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: var(--image);
  }

  #gradient-background {
    display: grid;
    align-content: end;

    height: 100%;
    width: 100%;

    padding: 2rem;

    background: linear-gradient(45deg, rgb(0 0 0 / 0.7), rgb(0 0 0 / 0));
  }

  #links {
    display: flex;
    gap: 1rem
  }

  @media only screen and (max-width: 600px) {
    #gradient-background {
      padding: .5rem;
    }

    #links {
      gap: .5rem;
    }

    a, a.visit.visit {
      font-size: 0.8rem;

      padding: 0.6rem 1rem 0;
      gap: 0.2rem;

      line-height: 1.5rem;
    }

    svg {
      --size: 0.8rem;
    }

    p {
      font-size: 0.9rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      text-wrap: pretty;

      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
</style>