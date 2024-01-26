<script lang="ts">
  import { onMount } from "svelte";
  import { windowWidth } from "$lib/stores";

  export let color: string = "red";
  export let dissipate: boolean = false;

  let screenWidth: number;
  windowWidth.subscribe((width) => {
    screenWidth = width;
  });

  let size: number = 320;

  let x: number = randomSignedInRange(300);
  let y: number = randomSignedInRange(300);

  let vx: number = 0;
  let vy: number = 0;

  let limit: number = size / 2;
  let vlimit: number = 12;
  const speedModifier: number = 2;
  const reduceSpeedBy: number = 0.4;

  const calcsPerSecond: number = 15;
  const interval = 1000 / calcsPerSecond;
  let previousTimestamp = 0; // initialize the previous timestamp

  function randomSignedInRange(value: number) {
    return (Math.random() - 0.5) * value * 2;
  }

  function updatePositions(timestamp: number) {
    let deltaTime = timestamp - previousTimestamp;

    if (deltaTime >= interval) {
      vx += randomSignedInRange(speedModifier);
      vy += randomSignedInRange(speedModifier);

      // check speed limits
      if (vx > vlimit) vx -= 2;
      if (vy > vlimit) vy -= 2;
      if (vx < -vlimit) vx += 2;
      if (vy < -vlimit) vy += 2;

      if (!dissipate) {
        if(screenWidth < 900) limit = size / 4;
        else limit = size / 2;
        if (Math.abs(x) <= limit || Math.abs(y) <= limit) vlimit = 12;

        // get bubbles within limits
        if (x > limit) vx -= reduceSpeedBy * 2;
        if (x < -limit) vx += reduceSpeedBy * 2;
        if (y > limit) vy -= reduceSpeedBy * 2;
        if (y < -limit) vy += reduceSpeedBy * 2;
      } else {
        limit = screenWidth;
        vlimit = 40;

        // increase speeds to fly outside screen
        if (Math.abs(x) <= limit) vx *= 1.6;
        if (Math.abs(y) <= limit) vy *= 1.6;

        // outside of limit, stop
        if (Math.abs(x) > limit) vx *= 0;
        if (Math.abs(y) > limit) vy *= 0;
      }

      // update positions
      x += vx;
      y += vy;

      previousTimestamp = timestamp;
    }
  }

  function checkWidth() {
    if (screenWidth < 900) size = 160;
    else size = 320;
  }

  function draw(timestamp: number) {
    checkWidth();
    updatePositions(timestamp);

    window?.requestAnimationFrame(draw);
  }

  onMount(() => {
    if (!window?.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window?.requestAnimationFrame(draw);
    }
  });
</script>

<div
  class="bubble"
  class:dissipate
  style="
    --color: {color}; --x: {x - size / 2}px;
    --y: {y - size / 2}px; --size: {size}px;
    --transition: {interval}ms;
  "
></div>

<style>
  .bubble {
    position: absolute;

    top: var(--x);
    left: var(--y);

    height: var(--size);
    width: var(--size);

    background-color: var(--color);

    border-radius: 100%;
    filter: blur(calc(var(--size) / 4));

    transition: opacity 1s, top var(--transition) linear, left var(--transition) linear;
  }

  .dissipate {
    opacity: 0;
  }
</style>
