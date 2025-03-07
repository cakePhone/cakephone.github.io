<script lang="ts">
  import Carousel from "$lib/components/carousel.svelte";

  let welcomeSpans: string[] = [
    "Welcome!",
    "I'm Miguel Santos.",
    "a Web Developer, ",
    "Software Engineer",
    "and Designer",
  ];

  let displaySpeed: number = 0.9;
</script>

<section id="landing">
  <h1 id="welcome">
    {#each welcomeSpans as welcomeText, index}
      <span class="fade-pop-up-in" style="--delay: {index * displaySpeed}s">
        {welcomeText}
      </span>
      <br />
    {/each}
  </h1>
  <div
    class="fade-pop-up-in welcome__details"
    style="--delay: {welcomeSpans.length * displaySpeed + displaySpeed * 0.2}s;"
  >
    <h2>Contact me:</h2>
    <div>
      <a href="mailto:miguelandrelealsantos.business@gmail.com">-Gmail-</a>
      <a href="https://github.com/cakePhone">-Github-</a>
      <a href="https://www.instagram.com/cakephoneig">-Intagram-</a>
      <a
        href="https://www.linkedin.com/in/miguel-andr%C3%A9-leal-santos-a2b3282b1/"
        >-LinkedIn-</a
      >
    </div>
  </div>
  <div
    class="fade-pop-up-in welcome__details"
    style="--delay: {welcomeSpans.length * displaySpeed + displaySpeed * 0.5}s;"
  >
    <h2>Or try:</h2>
    <div>
      <a href="#checkingmyprojects" class="id-anchor"
        >checking<wbr />my<wbr />projects</a
      >
      <a href="/blog" class="id-anchor">reading<wbr />the<wbr />blog</a>
      <a href="#gettingacookie" class="id-anchor"
        >getting<wbr />a<wbr />cookie</a
      >
    </div>
  </div>
</section>
<hr />
<article>
  <section id="checkingmyprojects">
    <h1>My Projects and Contributions</h1>
    <Carousel />
  </section>

  <section id="takingaread">
    <h1>Who am I?</h1>
    <h2 style="margin-top: 12px;">Brief resumé</h2>
    <p>
      🎓 I'm taking a Bachelor's Degree in Software Engineering at Universidade
      do Minho.
    </p>
    <p>
      👨‍💻 I'm experienced with HTML, CSS, JS and popular JS Frameworks such as
      NextJS, Svelte and Vue.
    </p>
    <p>⚙️ I'm studying languages such as C, Java, Go, Python and Haskell.</p>
    <p>⭐️ Gopher for life!</p>
  </section>
</article>
