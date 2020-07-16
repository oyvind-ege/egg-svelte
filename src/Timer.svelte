<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';

  export let secondsRemaining;
  let active = true;
  let intervalID;

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
  .timer {
    background-color: blue;
    color: white;
  }

  .active {
    background-color: red;
    color: white;
  }
</style>

<article class:active="{active === false}">
  <p>Remaining time: {secondsRemaining}</p>
</article>

