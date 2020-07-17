<script>
  import { onMount } from "svelte";

  export let secondsRemaining;
  let active = true;
  let intervalID;

  $: minutes = Math.floor(secondsRemaining / 60);
  $: seconds = Math.floor(secondsRemaining - minutes * 60).toString().padStart(2, '0');

  const updateTimer = () => {
    if (secondsRemaining === 1){
      clearInterval(intervalID);
      active = false;
    }
    secondsRemaining -= 1;
  }

  onMount(() => {
    intervalID = setInterval(() => {
      updateTimer();
    }, 1000)
  });
</script>

<style>

  article {
    display: inline-block;
    width: 100%;
    margin-top: 20px;
    padding-left: 20px;
  }

  .timer {
    background-color: #FFF7A7;
    border: 0.5px solid #5C3A89;
    color: black;
  }

  .active {
    background-color: #DD534F;
    color: white;
  }

  .ticktock {
    color: orange;
  }
</style>

<article class:timer="{active === true}" class:active="{active === false}">
  {#if active === true}
    <h4>Your egg is cooking...</h4>
    <p>Remaining: <span class="ticktock">{minutes}:{seconds}</span></p>
  {:else}
    <p>Shit! Time to get your eggs!<span class="ticktock">{minutes}:{seconds}</span></p>
  {/if}
</article>

