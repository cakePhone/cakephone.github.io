<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { Body } from "svelte-body";

  let { children } = $props();

  let title_text: string = $state(`blog/`);
  let to_add: string = $state(page.params.title);

  let done: boolean = $state(false);

  onMount(() => {
    for (let i = 0; i < to_add.length; i++) {
      setTimeout(() => {
        title_text += to_add[i];
      }, i * 100);
    }
    setTimeout(() => {
      done = true;
    }, to_add.length * 100);
  });
</script>

{#if done}
  <Body class="change-colors" />
{/if}

<div class="splash" class:fade-out={done}>
  <h1>{title_text}</h1>
</div>

<div class="content" class:fade-in={done}>
  {@render children()}
</div>

<style>
  .splash {
    --initial-font-size: 4rem;
    --final-font-size: 2rem;
    --initial-transform: translate(-50%, -50%);
    --final-transform: translate(0, -600%);
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: var(--initial-font-size);

    position: absolute;
    top: 50%;
    left: 50%;
    transform: var(--initial-transform);
  }

  .fade-out {
    opacity: 1;
    visibility: visible;
    filter: blur(0);
    animation: fade-out 1s ease-in 1s forwards;
  }

  .fade-in {
    opacity: 0;
    visibility: hidden;
    filter: blur(10rem);
    animation: fade-in 1s ease-in 1s forwards;
  }

  .splash h1 {
    font-size: inherit;
    white-space: nowrap;
    margin: 0;
  }

  .content {
    opacity: 0;
    min-height: 100vh;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      visibility: hidden;
      filter: blur(10rem);
    }
    99% {
      opacity: 1;
    }
    100% {
      visibility: visible;
      display: block;
      opacity: 1;
      filter: blur(0);
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
      visibility: visible;

      filter: blur(0);
    }

    75% {
      transform: var(--final-transform);

      font-size: var(--final-font-size);
    }

    100% {
      visibility: hidden;
      display: none;
      opacity: 0;

      filter: blur(5rem);
    }
  }

  @media (max-width: 600px) {
    .splash {
      --initial-font-size: 2rem;
      --final-font-size: 1rem;

      --final-transform: translate(0, -1100%);
    }
  }
</style>
