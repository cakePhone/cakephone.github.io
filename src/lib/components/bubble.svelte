<script lang="ts">
  import {onMount} from "svelte";
  import {windowWidth} from "$lib/stores";

  export let color: string = "red";

  let screenWidth: number;
  windowWidth.subscribe((width) => {screenWidth = width})

  let size: number = 320;

  let x: number = randomSigned(300);
  let y: number = randomSigned(300);

  let vx: number = 0;
  let vy: number = 0;

  const limit: number = size / 2;
  const vlimit: number = 3;
  const speedModifier: number = 0.5
  const reduceSpeedBy: number = 0.1;

  const fps: number = 60;
  const interval = 1000 / fps;

  function randomSigned(value: number) {
    return (Math.random() - .5) * value
  }

  function updatePositions() {
    vx += randomSigned(speedModifier)
    vy += randomSigned(speedModifier)

    // check speed limits
    if (vx > vlimit) vx = vlimit
    if (vy > vlimit) vy = vlimit
    if (vx < -vlimit) vx = -vlimit
    if (vy < -vlimit) vy = -vlimit

    // reduce speed of bubbles off limits
    if ((x + vx) > limit) vx -= reduceSpeedBy
    if ((x + vx) < -limit) vx += reduceSpeedBy
    if ((y + vy) > limit) vy -= reduceSpeedBy
    if ((y + vy) < -limit) vy += reduceSpeedBy

    // update positions
    x += vx
    y += vy
  }

  function checkWidth() {
    if(screenWidth < 599) size = 160
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

<div class="bubble" style="--color: {color}; --x: {x + size/2}px; --y: {y + size/2}px; --size: {size}px"></div>

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

    transition: all 16ms;
  }
</style>