<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from 'svelte';

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
  .timer {
    background-color: blue;
    color: white;
  }

  .active {
    background-color: red;
    color: white;
  }
</style>

<article class:timer="{active === true}" class:active="{active === false}">
  <p>{minutes}:{seconds}</p>
</article>

