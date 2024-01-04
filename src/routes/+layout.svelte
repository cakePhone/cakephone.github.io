<script lang="ts">
  import "../app.css";
  import Bubble from "$lib/components/bubble.svelte";
  import {bubblesRightSide, windowWidth} from "$lib/stores";
  import {onMount} from "svelte";
  import bubble from "$lib/components/bubble.svelte";

  let updatedWindowWidth: number = 0;
  function updateWindowWidth(width: number) {
    windowWidth.set(width)
  }

  let height: number = 0;
  let scroll: number = 0;
  let bubblesOnRight: boolean;
  let dissipate: boolean = false;

  onMount(() => {
    bubblesRightSide.subscribe((value: boolean) => bubblesOnRight = value)
  })

  $: updateWindowWidth(updatedWindowWidth);
  $: dissipate = scroll > height / 2;
</script>

<svelte:window bind:innerWidth={updatedWindowWidth} bind:innerHeight={height} bind:scrollY={scroll}></svelte:window>

<div id="background">
  <div id="bubble-container" class:bubbles-right={bubblesOnRight && updatedWindowWidth > 600}>
    <Bubble color="#f2e2ba" dissipate={dissipate}/>
    <Bubble color="#f2bac9" dissipate={dissipate}/>
    <Bubble color="#baf2d8" dissipate={dissipate}/>
    <Bubble color="#ff99c8" dissipate={dissipate}/>
  </div>
</div>

<main>
  <slot />
</main>

<svg>
  <filter id='noiseFilter'>
    <feTurbulence
        type='fractalNoise'
        baseFrequency='0.6'
        stitchTiles='stitch'/>
    <feColorMatrix in="colorNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
    <feComposite operator="in" in2="SourceGraphic" result="monoNoise"/>
    <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
  </filter>
</svg>
