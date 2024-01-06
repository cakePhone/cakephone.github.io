<script lang="ts">
  export let type: string;
  export let href: string = "";
  export let method: Function = () => {};
</script>

{#if type === "anchor"}
  <a {href}>
    <slot />
  </a>
{:else if type === "button"}
  <button on:click={() => method()}>
    <slot />
  </button>
{/if}

<style>
  a,
  button {
    --border-radius: 0.5rem;

    position: relative;

    top: 0;

    color: var(--on-primary);
    background-color: var(--primary);
    font-family: var(--ff-headings);
    text-align: center;

    outline: none;
    text-decoration: none;

    padding: 1rem 1rem 0.4rem;
    border-radius: var(--border-radius);

    border-top: 3px solid #d2eaff;
    border-bottom: 5px solid #d2eaff;
    border-inline: 4px solid #d2eaff;
    transition: all 100ms;
  }

  a::before,
  button::before {
    content: "";
    position: absolute;

    height: calc(100% + 8px);
    width: calc(100% + 8px);

    top: 4px;
    left: -4px;
    z-index: -1;

    border-radius: calc(var(--border-radius) + 2px);

    background-color: #74bbff;

    transition: all 100ms;
    box-shadow: 0 -2px 10px rgb(0 0 0 / 20);
  }

  a:active::before,
  button:active::before {
    top: -4px;
    box-shadow: 0 0 0 transparent;
  }

  a:active,
  button:active {
    top: 4px;
    box-shadow: 0 0 5px rgb(0 0 0 / 100);
  }
</style>
