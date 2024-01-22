<script lang="ts">
  import { onMount } from "svelte";
  import type { project } from "$lib";
  import Project from "./project.svelte";

  let projectsJson: project[] = [];
  let carousel: HTMLElement;
  let carouselScroll: number = 0;
  let width: number = 1;

  let currentShowingIndex: number = 0;

  function defineCarouselScroll() {
    carouselScroll = carousel.scrollLeft;
  }

  onMount(async () => {
    projectsJson = await (await fetch("/projects/projects.json")).json();
  })

  $: currentShowingIndex = Math.round(carouselScroll/width);
</script>

<section bind:this={carousel} bind:clientWidth={width} on:scroll={defineCarouselScroll}>
  {#each projectsJson as project}
    <Project
      title={project.title}
      description={project.description}

      href={project.href}
      github={project.github}

      image={project.image}

      accent={project.accent}
      onAccent={project.onAccent}
      onSurface={project.onSurface}
    />
  {/each}
</section>
<div class="carousel__pages">
  {#each projectsJson as _, index}
    <div class="carousel__page" class:current={currentShowingIndex === index}></div>
  {/each}
</div>

<style>
  section {
    display: flex;
    gap: 1rem;

    margin-top: 2rem;
    padding: 0;

    aspect-ratio: 16/9;
    width: 100%;

    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    border-radius: 0.5rem;

    scrollbar-width: 0;
  }

  section::-webkit-scrollbar {
    display: none;
  }

  .carousel__pages {
    display: flex;
    margin-top: 0.5rem;
    margin-inline: 0.5rem;

    gap: 0.5rem;
  }

  .carousel__page {
    height: 0.25rem;
    width: 100%;

    transition: all 0.5s;

    border-radius: 1rem;

    background-color: rgb(255 255 255 / 0.3);
  }

  .current {
    background-color: rgb(255 255 255);
  }
</style>