<script lang="ts">
  import "../app.css";
  import Bubble from "$lib/components/bubble.svelte";
  import { Body } from "svelte-body";

  let height: number = 0;
  let scroll: number = 0;
  let dissipate: boolean = false;

  $: dissipate = scroll > height * 0.6;
</script>

<svelte:window
  bind:innerHeight={height}
  bind:scrollY={scroll}
/>
{#if height * 0.6 < scroll}
  <Body class="change-colors" />
{/if}

<div id="background">
  <svg>
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.6"
        stitchTiles="stitch"
      />
      <feColorMatrix
        in="colorNoise"
        type="matrix"
        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
      />
      <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
      <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
    </filter>
  </svg>
  <div id="bubble-container">
    <Bubble color="var(--accent)" {dissipate} />
    <Bubble color="#dbe2ff" {dissipate} />
    <Bubble color="#62fc83" {dissipate} />
  </div>
</div>

<main id="top">
  <slot />
</main>
<hr>
<footer>
  <p>&copy; Miguel Santos - 2024 | Made with love ❤️ | <a href="#top">Go back to top</a></p>
  <p>This website doesn't use cookies, so take as many as you want 🍪</p>
</footer>