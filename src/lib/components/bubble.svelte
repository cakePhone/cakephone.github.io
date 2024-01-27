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
        calc(var(--max-pos-deviation) * cos(0deg)),
        calc(var(--max-pos-deviation) * sin(0deg))
        );
    }

    10% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(36deg)),
        calc(var(--max-pos-deviation) * sin(36deg))
        );
    }

    20% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(72deg)),
        calc(var(--max-pos-deviation) * sin(72deg))
        );
    }

    30% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(108deg)),
        calc(var(--max-pos-deviation) * sin(108deg))
        );
    }

    40% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(144deg)),
        calc(var(--max-pos-deviation) * sin(144deg))
        );
    }

    50% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(180deg)),
        calc(var(--max-pos-deviation) * sin(180deg))
        );
    }
    
    60% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(-144deg)),
        calc(var(--max-pos-deviation) * sin(-144deg))
        );
    }

    70% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(-108deg)),
        calc(var(--max-pos-deviation) * sin(-108deg))
        );
    }
    
    80% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(-72deg)),
        calc(var(--max-pos-deviation) * sin(-72deg))
        );
    }

    90% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(-36deg)),
        calc(var(--max-pos-deviation) * sin(-36deg))
        );
    }

    100% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg)),
        calc(var(--max-pos-deviation) * sin(0deg))
        );
    }
  }

  @keyframes bubble-float-2 {
    0% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg)),
        calc(var(--max-pos-deviation) * sin(0deg))
        );
    }

    33% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(120deg)),
        calc(var(--max-pos-deviation) * sin(120deg))
        );
    }

    66% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(240deg)),
        calc(var(--max-pos-deviation) * sin(240deg))
        );
    }

    100% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg)),
        calc(var(--max-pos-deviation) * sin(0deg))
        );
    }
  }


  @keyframes bubble-float-3 {
    0% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg)),
        calc(var(--max-pos-deviation) * sin(0deg))
        );
    }

    25% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(90deg)),
        calc(var(--max-pos-deviation) * sin(90deg))
        );
    }

    50% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(180deg)),
        calc(var(--max-pos-deviation) * sin(180deg))
        );
    }

    75% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(270deg)),
        calc(var(--max-pos-deviation) * sin(270deg))
        );
    }

    100% {
      transform: translate(
        calc(var(--max-pos-deviation) * cos(0deg)),
        calc(var(--max-pos-deviation) * sin(0deg))
        );
    }
  }

  @media only screen and (max-width: 600px) {
    .bubble {
      --size: 200px;
    }
  }
</style>
