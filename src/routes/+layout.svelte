<script lang="ts">
  import "../app.css";
  import Bubble from "$lib/components/bubble.svelte";
  import { Body } from "svelte-body";
  import FallingCookie from "$lib/components/falling-cookie.svelte";

  let fallingCookies: { id: number }[] = [];
  let nextCookieId: number = 0;

  let height: number = 0;
  let scroll: number = 0;
  let dissipate: boolean = false;

  function popOutCookie() {
    fallingCookies = [...fallingCookies, { id: nextCookieId++ }];
  }

  function removeCookie(id: number) {
    fallingCookies = fallingCookies.filter((cookie) => cookie.id != id);
  }

  $: dissipate = scroll > height * 0.6;
</script>

<svelte:window bind:innerHeight={height} bind:scrollY={scroll} />
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
<hr />
<footer>
  <p>
    &copy; Miguel Santos - 2024 | Made with love ❤️ | <a href="#top"
      >Go back to top</a
    >
  </p>
  <p>
    This website doesn't use cookies, so take as many as you want
    <button id="gettingacookie" on:click={popOutCookie}>
      🍪
      {#each fallingCookies as cookie (cookie.id)}
        <FallingCookie on:remove={() => removeCookie(cookie.id)} />
      {/each}
    </button>
  </p>
</footer>
