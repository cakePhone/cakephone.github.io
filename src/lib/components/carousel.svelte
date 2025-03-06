<script lang="ts">
  import { run } from "svelte/legacy";

  import { onMount } from "svelte";
  import type { project } from "$lib";
  import Project from "./project.svelte";

  let projectsJson: project[] = $state([]);
  let carousel: HTMLElement | undefined = $state();
  let carouselScroll: number = $state(0);
  let width: number = $state(1);

  let currentShowingIndex: number = $state(0);

  let hasInteracted: boolean = $state(false);

  function defineCarouselScroll() {
    carouselScroll = carousel.scrollLeft;
  }

  function scrollToIndex(index: number) {
    carousel.scrollTo({
      left: index * width,
      behavior: "smooth",
    });
  }

  onMount(async () => {
    projectsJson = await (await fetch("/projects/projects.json")).json();

    const projectCarouselLoop = setInterval(() => {
      if (hasInteracted) {
        clearInterval(projectCarouselLoop);
      } else {
        if (currentShowingIndex < projectsJson.length - 1) {
          currentShowingIndex++;
        } else {
          currentShowingIndex = 0;
        }

        scrollToIndex(currentShowingIndex);
      }
    }, 6000);
  });

  run(() => {
    currentShowingIndex = Math.round(carouselScroll / width);
  });
</script>

<section
  bind:this={carousel}
  bind:clientWidth={width}
  onscroll={defineCarouselScroll}
  id="carousel"
>
  {#if projectsJson.length !== 0}
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
  {/if}
</section>
<div class="carousel__page-indicators">
  {#each projectsJson as _, index}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
      class="carousel__page-indicators__indicator"
      class:current={currentShowingIndex === index}
      data-looping={!hasInteracted}
      onclick={() => {
        scrollToIndex(index);
        hasInteracted = true;
      }}
    ></div>
  {/each}
</div>

<style>
  section {
    display: flex;
    gap: 1rem;

    position: relative;

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

  .carousel__page-indicators {
    display: flex;
    justify-content: center;

    width: 100%;

    margin-top: 0.5rem;

    gap: 0.5rem;
  }

  .carousel__page-indicators__indicator {
    position: relative;

    height: 0.5rem;
    width: 100%;

    transition: all 0.5s;

    border-radius: 1rem;

    background-color: rgb(255 255 255 / 0.3);

    cursor: pointer;
  }

  .carousel__page-indicators__indicator::after {
    content: "";

    position: absolute;
    top: 0;
    left: 0;

    height: 0.5rem;
    width: 0;

    border-radius: 1rem;

    opacity: 0;

    background-color: var(--accent);
  }

  .carousel__page-indicators__indicator[data-looping="false"]::after {
    opacity: 1;
  }

  .current[data-looping="false"]::after {
    transition: width 0s;
  }

  .current::after {
    width: 100%;
    opacity: 1;
    transition:
      all 5.5s linear,
      opacity 0.5s linear;
  }
</style>
