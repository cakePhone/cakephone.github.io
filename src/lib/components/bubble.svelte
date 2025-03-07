<script lang="ts">
  import { onMount } from "svelte";

  interface Props {
    color?: string;
    dissipate?: boolean;
  }

  interface Vector2 {
    x: number;
    y: number;
  }

  let lastTimestamp: number | undefined;

  let p: Vector2 = $state({
    x: (Math.random() - 0.5) * 100,
    y: (Math.random() - 0.5) * 100,
  });
  let v: Vector2 = {
    x: (Math.random() - 0.5) * 5,
    y: (Math.random() - 0.5) * 5,
  };
  let a: Vector2 = {
    x: (Math.random() - 0.5) * 2,
    y: (Math.random() - 0.5) * 2,
  };

  let dir: number = Math.atan2(v.y, v.x) + (Math.random() - 0.5) * Math.PI * 2;

  let distFromOrigin: number = 0;

  function addV2(v1: Vector2, v2: Vector2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
  }

  function scaleV2(v: Vector2, scalar: number) {
    return { x: v.x * scalar, y: v.y * scalar };
  }

  function lengthV2(v: Vector2): number {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
  }

  function bubbleLifeLoop(timestamp: number) {
    if (typeof lastTimestamp === "undefined") lastTimestamp = timestamp;

    const dt = (timestamp - lastTimestamp) / 100;
    lastTimestamp = timestamp;

    const angleChange = (Math.random() - 0.5) * 0.2;
    const currentSpeed = lengthV2(v);
    let currentAngle = Math.atan2(v.y, v.x) + angleChange;
    v = {
      x: Math.cos(currentAngle) * currentSpeed,
      y: Math.sin(currentAngle) * currentSpeed,
    };

    const maxSpeed = 20;
    const currentVelocity = lengthV2(v);
    if (currentVelocity > maxSpeed) {
      v = scaleV2(v, maxSpeed / currentVelocity);
    }

    const centerAttractionStrength = 0.005 * Math.exp(distFromOrigin / 100);
    const attraction = {
      x: -p.x * centerAttractionStrength,
      y: -p.y * centerAttractionStrength,
    };
    v = addV2(v, scaleV2(addV2(a, attraction), dt));

    if (lengthV2(v) < 0.001) {
      v = { x: 0, y: 0 };
    }

    p = addV2(p, scaleV2(v, dt));
    distFromOrigin = lengthV2(p);

    requestAnimationFrame(bubbleLifeLoop);
  }

  onMount(() => {
    requestAnimationFrame(bubbleLifeLoop);
  });

  let { color = "red", dissipate = false }: Props = $props();
</script>

<div
  class="bubble"
  class:dissipate
  style="--color: {color}; --x: {p.x}px; --y: {p.y * -1}px"
></div>

<style>
  .bubble {
    --size: 300px;

    position: absolute;

    transform: translateX(calc(var(--size) / -2 + var(--x)))
      translateY(calc(var(--size) / -2 + var(--y)));

    height: var(--size);
    width: var(--size);

    background-color: var(--color);

    border-radius: 100%;
    filter: blur(calc(var(--size) / 4));

    transition: opacity 0.5s ease-in-out;
  }

  .dissipate {
    opacity: 0;
  }

  @media only screen and (max-width: 600px) {
    .bubble {
      --size: 200px;
    }
  }
</style>
