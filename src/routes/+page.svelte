<script lang="ts">
  import PopUpButton from "$lib/components/PopUpButton.svelte";

  let welcomeSpans: string[] = ['Welcome!', "I'm Miguel Santos.", "Contact me:"]
</script>

<h1 id="welcome">
  {#each welcomeSpans as welcomeText, index}
    <span class="fade-pop-up-in" style="--delay: {index * 2}s">{@html welcomeText}</span><br>
  {/each}
</h1>
<div class="fade-pop-up-in welcome__contacts" style="--delay: 4.5s">
  <PopUpButton type="anchor">Gmail</PopUpButton>
  <PopUpButton type="anchor" href="https://github.com/cakePhone">Github</PopUpButton>
</div>

<style>
  .fade-pop-up-in {
    position: relative;
    opacity: 0;

    animation: fade-pop-up-in 300ms forwards;
    animation-delay: var(--delay);
  }

  @keyframes fade-pop-up-in {
    from {
      opacity: 0;
      top: 50px;
    }

    to {
      opacity: 1;
      top: 0;
    }
  }
</style>