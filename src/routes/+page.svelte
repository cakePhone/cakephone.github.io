<script lang="ts">
  let welcomeSpans: string[] = ["Welcome!", "I'm Miguel Santos."];
</script>

<section id="landing">
  <h1 id="welcome">
    {#each welcomeSpans as welcomeText, index}
      <span class="fade-pop-up-in" style="--delay: {index * 1.2}s"
        >{welcomeText}</span
      ><br />
    {/each}
  </h1>
  <div class="fade-pop-up-in welcome__details" style="--delay: 2s;">
    <h2>Contact me:</h2>
    <a href="mailto:miguelandrelealsantos.business@gmail.com">-Gmail-</a>
    <a href="https://github.com/cakePhone">-Github-</a>
    <a href="https://www.instagram.com/cakephoneig">-Intagram-</a>
  </div>
  <div class="fade-pop-up-in welcome__details" style="--delay: 2.5s;">
    <h2>Or try:</h2>
    <a href="#takingaread" class="id-anchor">takingaread</a>
    <a href="" class="id-anchor">checkingmyprojects</a>
  </div>
</section>
<hr />
<article id="takingaread">
  <section>
    <h2>A little about myself</h2>
    <p>
      Hi! I'm Miguel Santos, a 17 year old Portuguese self-taught web developer.
      I work mainly with Svelte, used for this website, but I have some
      knowledge with Vue. My skills on the backend are not that great (as of
      writing this), but I've been learning Go and C and I've experimented with
      Rust, Kotlin and even Python! I can say I love tinkering around with
      different programming languages feeling around for what I find more
      intuitive to me.
    </p>
    <p>
      I first started coding at the age of 14 when I got invited to an
      internship at a start-up named "Lovys". But before joining, I was
      challenged to work with Python and learn the basics of coding. I started
      by taking a free Harvard course,
      <a
        href="https://pll.harvard.edu/course/cs50-introduction-computer-science"
        class="anchor">CS50</a
      >. I couldn't finish it, but I learnt a lot. In that internship, I learnt
      a bit more of Python, working with APIs and a small library known by all,
      turtle. And hey! That's me while at it!
    </p>
    <img
      src="/about-myself/internship.jpg"
      alt="Miguel sitting at his desk during the internship"
    />
    <img
      src="/about-myself/internship-beach.jpg"
      alt="Miguel leaning on a wall near Porto Beach"
    />
  </section>

  <hr />

  <section>
    <h3>What got me into coding</h3>
    <p>
      I've always been keen on computers, my first electronic device was an
      android tablet when I was only 5-6 years old. I can't remember the exact
      model, but I know that not soon after I managed to find ways of cracking
      my favourite and fastest growing game at the time, Minecraft. In 5th grade
      I made an attempt at joining a programming club, but due to it being
      overcrowded, I had to leave and joined my friend on another club.
    </p>
    <p>
      Later on, at the end of 9th grade, I joined the internship I wrote about
      above. That was the true spark of my coding journey. All thanks to my
      cousin that never gave up motivating me to continue working and improving.
      Not just in coding, but also in studies.
    </p>
  </section>

  <section>
    <h3>My personality</h3>
    <p>
      I'm a very casual person around those I meet, especially with friends,
      despite the initial interaction barrier being quite hard to break for me.
      I work mainly alone, but I'm open to team work.
    </p>
    <p>
      I'm very focused on my work, doing everything I set my mind to. My biggest
      flaw is exactly the same thing: if I simply set my mind to not do something,
      I won't do it. I do try to go around it and push through my own lack of
      motivation for things I find useless or without meaning.
    </p>
  </section>
</article>
