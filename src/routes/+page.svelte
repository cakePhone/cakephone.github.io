<script lang="ts">
  import IntersectionObserver from "svelte-intersection-observer"
  let welcomeSpans: string[] = ['Welcome!', "I'm Miguel Santos."]
</script>

<div id="landing">
  <h1 id="welcome">
    {#each welcomeSpans as welcomeText, index}
      <span class="fade-pop-up-in" style="--delay: {index * 1.2}s">{@html welcomeText}</span><br>
    {/each}
  </h1>
  <section class="fade-pop-up-in welcome__details" style="--delay: 2s;">
    <h2>Contact me:</h2>
    <a href="mailto:miguelandrelealsantos.business@gmail.com">-Gmail-</a>
    <a href="https://github.com/cakePhone">-Github-</a>
    <a href="phoneto:+351916692279">-Phone-</a>
  </section>
  <section class="fade-pop-up-in welcome__details" style="--delay: 2.5s;">
    <h2>Or try:</h2>
    <a href="#bio" class="id-anchor">takingaread</a>
    <a href="" class="id-anchor">checkingmyprojects</a>
  </section>
</div>

<article style="float: right;" id="bio">
  <h2>A little about myself</h2>
  <p>
    Hi! I'm Miguel Santos, a 17 year old Portuguese self-taught web developer. I work mainly
    with Svelte, used for this website, but I have some knowledge with Vue and React. The latter
    being my least worked with.
    <br>
    I first started coding at the age of 14 when I got invited to an internship at a start-up named
    "Lovys". But before joining, I was challenged to work with Python and learn the basics of coding.
    I started by taking a free Harvard course,
    <a href="https://pll.harvard.edu/course/cs50-introduction-computer-science" class="anchor">CS50</a>.
    I couldn't finish it, but I learnt a lot. In that internship, I learnt a bit more of Python, working with APIs
    and a small library known by all, turtle. And hey! That's me while at it!
  </p>
  <div class="inline-pictures">
    <img src="/about-myself/internship.jpg" alt="Miguel sitting at his desk during the internship"/>
    <img src="/about-myself/internship-beach.jpg" alt="Miguel leaning on a wall near Porto Beach"/>
  </div>
</article>

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