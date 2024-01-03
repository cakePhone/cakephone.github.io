<script lang="ts">
  import "../app.css";
  import Bubble from "$lib/components/bubble.svelte";
  import {windowWidth} from "$lib/stores";

  let updatedWindowWidth: number = 0;
  function updateWindowWidth(width: number) {
    windowWidth.set(width)
  }

  $: updateWindowWidth(updatedWindowWidth)
</script>

<svelte:window bind:innerWidth={updatedWindowWidth}></svelte:window>

<div id="background">
  <div id="bubble-container">
    <Bubble color="#f2e2ba"/>
    <Bubble color="#f2bac9"/>
    <Bubble color="#baf2d8"/>
    <Bubble color="#ff99c8"/>
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
