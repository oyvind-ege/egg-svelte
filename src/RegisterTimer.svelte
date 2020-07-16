<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let egg = {
    size: 15,
    initialTemp: 4,
    waterTemp: 100,
    targetYolkTemp: 65,
  }

  const add = () => {
    dispatch('add', egg);
  }

</script> 

<section>
  <h3>Register new timer</h3>
  <form>
    <input type="number" bind:value={egg.size} />
    <button on:click|preventDefault={add}>Click to add</button>
  </form>
</section>

<style>
  
</style>

