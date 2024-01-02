<script lang="ts">
  const bubbles: {x: number, y: number, vx: number, vy: number}[] = new Array(20).fill({x: 0, y: 0, vx: 0, vy: 0})

  if (typeof window !== "undefined") {

  }
</script>

<div class="relative w-screen h-screen bubbles">
  {#each bubbles as bubble}
    <div class="h-24 w-24 absolute top-[{bubble.y}px] left-[{bubble.x}px] rounded-full bg-red-500"></div>
  {/each}
</div>

<main>

</main>