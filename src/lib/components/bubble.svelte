<script lang="ts">
  import {onMount} from "svelte";
  import {windowWidth} from "$lib/stores";

  export let color: string = "red";
  export let dissipate: boolean = false;

  let screenWidth: number;
  windowWidth.subscribe((width) => {screenWidth = width})

  let size: number = 320;

  let x: number = randomSigned(300);
  let y: number = randomSigned(300);

  let vx: number = 0;
  let vy: number = 0;

  let limit: number = 160;
  let vlimit: number = 3;
  const speedModifier: number = 0.5
  const reduceSpeedBy: number = 0.1;

  const fps: number = 60;
  const interval = 1000 / fps;

  function randomSigned(value: number) {
    return (Math.random() - .5) * value * 2
  }

  function updatePositions() {
    vx += randomSigned(speedModifier)
    vy += randomSigned(speedModifier)

    // check speed limits
    if (vx > vlimit) vx -= 0.5
    if (vy > vlimit) vy -= 0.5
    if (vx < -vlimit) vx += 0.5
    if (vy < -vlimit) vy += 0.5

    if (!dissipate) {
      limit = 160
      if (Math.abs(x) <= limit || Math.abs(y) <= limit) vlimit = 3

      // reduce speed of bubbles off limits
      if (x > limit) vx -= reduceSpeedBy
      if (x < -limit) vx += reduceSpeedBy
      if (y > limit) vy -= reduceSpeedBy
      if (y < -limit) vy += reduceSpeedBy
    } else {
      limit = screenWidth / 2 + size * 2;
      vlimit = 10

      // increase speeds to reach limit
      if (Math.abs(x) <= limit) vx *= 1.1
      if (Math.abs(y) <= limit) vy *= 1.1

      // outside of limit, stop
      if (Math.abs(x) > limit) vx *= 0
      if (Math.abs(y) > limit) vy *= 0
    }

    // update positions
    x += vx
    y += vy
  }


  function checkWidth() {
    if(screenWidth < 900) size = 160
    else size = 320
  }

  function draw() {
    checkWidth()
    updatePositions()
  }

  onMount(() => {
    setInterval(() => {
      window!.requestAnimationFrame(draw)
    }, interval)
  })
</script>

<div class="bubble" class:dissipate={dissipate} style="--color: {color}; --x: {x - size/2}px; --y: {y - size/2}px; --size: {size}px"></div>

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

    transition: opacity 1s
  }

  .dissipate {
    opacity: 0;
  }
</style>