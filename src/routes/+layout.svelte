<script lang="ts">
  import "../app.css";
  import Bubble from "$lib/components/bubble.svelte";
  import { Body } from "svelte-body";
  import FallingCookie from "$lib/components/falling-cookie.svelte";
  import { page } from "$app/state";
  import { onMount } from "svelte";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let { children }: Props = $props();

  let fallingCookies: { id: number }[] = $state([]);
  let nextCookieId: number = 0;

  const paths_to_keep_bubbles = ["/blog", "/"];
  const inPathThatKeepsBubbles = $derived(
    paths_to_keep_bubbles.some((str) => str == page.url.pathname),
  );

  let timedDissipate: boolean = $state(false);

  let height: number = $state(0);
  let scroll: number = $state(0);
  let dissipate: boolean = $derived(scroll > height * 0.6 || timedDissipate);

  function popOutCookie() {
    fallingCookies = [...fallingCookies, { id: nextCookieId++ }];
  }

  function removeCookie(id: number) {
    fallingCookies = fallingCookies.filter((cookie) => cookie.id != id);
  }

  $effect(() => {
    if (!inPathThatKeepsBubbles) {
      setTimeout(() => {
        timedDissipate = true;
      }, 1000);
    } else {
      timedDissipate = false;
    }
  });

  onMount(() => {});
</script>

<svelte:window bind:innerHeight={height} bind:scrollY={scroll} />
{#if dissipate}
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
  {@render children?.()}
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
    <button id="gettingacookie" onclick={popOutCookie}>
      🍪
      {#each fallingCookies as cookie (cookie.id)}
        <FallingCookie on:remove={() => removeCookie(cookie.id)} />
      {/each}
    </button>
  </p>
</footer>
