<script lang="ts">
  import { onMount } from "svelte";

  let { children } = $props();

  let title_text: string = $state("");

  onMount(() => {
    setTimeout(() => {
      const title = document.querySelectorAll("h1")[1];
      if (title) {
        title_text = title.outerText;
      }
    }, 100);
  });
</script>

<div class="splash">
  <h1>{title_text}</h1>
</div>

<div class="content">
  {@render children()}
</div>

<style>
  .splash {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    animation: fade-out 1s ease-in 1s forwards;
  }

  .splash h1 {
    font-size: 4rem;
    margin: 0;
  }

  .content {
    opacity: 0;
    animation: fade-in 1s ease-in 1s forwards;
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
    99% {
      opacity: 0;
    }
    100% {
      visibility: hidden;
      display: none;
      opacity: 0;
      filter: blur(10rem);
    }
  }
</style>
