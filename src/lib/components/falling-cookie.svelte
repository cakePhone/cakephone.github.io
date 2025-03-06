<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let elem: HTMLElement = $state();

  let pos: { x: number; y: number } = $state({ x: 0, y: 0 });
  let vel: { x: number; y: number } = {
    x: (Math.random() - 0.5) * 5,
    y: Math.random() * -10 - 10,
  };
  let rotationSpeed: number = Math.random() * 2 + 1;
  let rotation: number = $state(Math.random() * 60 + 30);
  let opacity: number = $state(1);
  let animationFrame: number;

  function animate() {
    vel.y += 0.5;
    rotationSpeed = Math.max(0, rotationSpeed - 0.01);

    pos.x += vel.x;
    pos.y += vel.y;
    rotation += rotationSpeed;

    opacity -= 0.01;

    if (elem) {
      const rect = elem.getBoundingClientRect();

      if (
        rect.bottom > window.innerHeight ||
        rect.right < 0 ||
        rect.left > window.innerWidth
      ) {
        dispatch("remove");
      }
    }

    if (opacity > 0) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      dispatch("remove");
    }
  }

  onMount(() => {
    animationFrame = requestAnimationFrame(animate);
  });

  onDestroy(() => {
    cancelAnimationFrame(animationFrame);
  });

  let style = $derived(`
    position: absolute;
    font-size: 24px;
    transform: translate(${pos.x}px, ${pos.y}px) rotate(${rotation}deg);
    opacity: ${opacity};
    `);
</script>

<div {style} bind:this={elem}>🍪</div>
