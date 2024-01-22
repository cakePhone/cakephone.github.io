<script lang="ts">
  export let title: string = "";
  export let description: string = "";

  export let href: string | null;
  export let github: string | null;

  export let image: string;

  export let accent: string = "#787896";
  export let onAccent: string;
  export let onSurface: string;
</script>

<div
  id="main" style="--image: url({image}); --project-accent: {accent}; --on-project-accent: {onAccent}; --on-project-surface: {onSurface};"
>
  <div id="gradient-background">
    <h3>{title}</h3>
    <p>{description}</p>
    <div>
      <a {href}>Visit</a>
      <a class="github" href={github}>Github</a>
    </div>
  </div>
</div>

<style>
  h3 {
    margin: 0;
    margin-bottom: -1rem;
    color: var(--project-accent);
  }

  p {
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--on-project-surface);
    text-align: left;
    line-height: normal;
  }

  a {
    text-decoration: none;
    color: var(--on-project-accent);

    width: auto;

    padding: 0.8rem 1rem 0;
    border-radius: 0.5rem;

    margin-right: 1rem;

    background-color: var(--project-accent);

    font-family: var(--ff-headings)
  }

  a.github {
    color: white;
    background-color: #000000;
  }

  #main {
    position: relative;

    height: 100%;
    min-width: 100%;

    border-radius: 0.5rem;
    overflow: hidden;
    scroll-snap-align: start;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: var(--image);
  }

  #gradient-background {
    display: grid;
    align-content: end;

    height: 100%;
    width: 100%;

    padding: 2rem;

    background: linear-gradient(45deg, rgb(0 0 0 / 0.7), rgb(0 0 0 / 0));
  }

  @media only screen and (max-width: 900px) {
    #gradient-background {
      padding: 1rem;
    }

    a {
      font-size: 0.9rem;
      padding: 0.6rem 0.8rem 0;
    }

    p {
      font-size: 0.9rem;
    }
  }
</style>