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
  let vlimit: number = 6;
  const speedModifier: number = 1;
  const reduceSpeedBy: number = 0.2;

  const fps: number = 30;
  const interval = 1000 / fps;
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
      if (vx > vlimit) vx -= 1;
      if (vy > vlimit) vy -= 1;
      if (vx < -vlimit) vx += 1;
      if (vy < -vlimit) vy += 1;

      if (!dissipate) {
        limit = size / 2;
        if (Math.abs(x) <= limit || Math.abs(y) <= limit) vlimit = 6;

        // reduce speed of bubbles off limits
        if (x > limit) vx -= reduceSpeedBy;
        if (x < -limit) vx += reduceSpeedBy;
        if (y > limit) vy -= reduceSpeedBy;
        if (y < -limit) vy += reduceSpeedBy;
      } else {
        limit = screenWidth;
        vlimit = 20;

        // increase speeds to fly outside screen
        if (Math.abs(x) <= limit) vx *= 1.3;
        if (Math.abs(y) <= limit) vy *= 1.3;

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
  style="--color: {color}; --x: {x - size / 2}px; --y: {y -
    size / 2}px; --size: {size}px"
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

    transition: opacity 1s;
  }

  .dissipate {
    opacity: 0;
  }
</style>
