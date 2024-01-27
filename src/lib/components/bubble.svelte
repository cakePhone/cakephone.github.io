<script lang="ts">
  export let color: string = "red";
  export let dissipate: boolean = false;
</script>

<div
  class="bubble"
  class:dissipate
  style="--color: {color};"
></div>

<style>
  .bubble {
    --max-pos-deviation: 150px;
    --size: 300px;

    position: absolute;

    top: calc(var(--size) / -2);
    left: calc(var(--size) / -2);

    height: var(--size);
    width: var(--size);

    background-color: var(--color);

    border-radius: 100%;
    filter: blur(calc(var(--size) / 4));

    transition: all 1s;
  }

  .bubble:nth-child(1) {
    animation: bubble-float-1 10s linear infinite;
  }

  .bubble:nth-child(2) {
    animation: bubble-float-2 8s linear infinite;
  }

  .bubble:nth-child(3) {
    animation: bubble-float-3 15s linear infinite;
  }

  .dissipate {
    opacity: 0;
  }

  @keyframes bubble-float-1 {
    0% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(0deg) - var(--size) / 2)
        );
    }

    10% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(36deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(36deg) - var(--size) / 2)
        );
    }

    20% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(72deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(72deg) - var(--size) / 2)
        );
    }

    30% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(108deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(108deg) - var(--size) / 2)
        );
    }

    40% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(144deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(144deg) - var(--size) / 2)
        );
    }

    50% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(180deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(180deg) - var(--size) / 2)
        );
    }
    
    60% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(-144deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(-144deg) - var(--size) / 2)
        );
    }

    70% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(-108deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(-108deg) - var(--size) / 2)
        );
    }
    
    80% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(-72deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(-72deg) - var(--size) / 2)
        );
    }

    90% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(-36deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(-36deg) - var(--size) / 2)
        );
    }

    100% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(0deg) - var(--size) / 2)
        );
    }
  }

  @keyframes bubble-float-2 {
    0% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(0deg) - var(--size) / 2)
        );
    }

    33% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(120deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(120deg) - var(--size) / 2)
        );
    }

    66% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(240deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(240deg) - var(--size) / 2)
        );
    }

    100% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(0deg) - var(--size) / 2)
        );
    }
  }


  @keyframes bubble-float-3 {
    0% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(0deg) - var(--size) / 2)
        );
    }

    25% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(90deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(90deg) - var(--size) / 2)
        );
    }

    50% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(180deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(180deg) - var(--size) / 2)
        );
    }

    75% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(270deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(270deg) - var(--size) / 2)
        );
    }

    100% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg) - var(--size) / 2),
        calc(var(--max-pos-deviation) * sin(0deg) - var(--size) / 2)
        );
    }
  }

  @media only screen and (max-width: 600px) {
    .bubble {
      --size: 200px;
    }
  }
</style>
