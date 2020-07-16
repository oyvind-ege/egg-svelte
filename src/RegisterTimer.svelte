<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const temperatureOptions = [
    4,
    20
  ]

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
    <label for="size">Size:</label>
    <input name="size" type="number" bind:value={egg.size} />
    <label for="initialtemp">Initial egg temperature:</label>
    <select name="initialtemp" bind:value={egg.initialTemp}>
      {#each temperatureOptions as tmpOption}
      <option value="{tmpOption}">
        {tmpOption}
      </option>
      {/each}
    </select>
    <label for="boil-target">Target temperature:</label>
    <input name="boil-target" type="number" bind:value={egg.targetYolkTemp} />
    <button on:click|preventDefault={add}>Click to add</button>
  </form>
</section>

<style>
  
</style>

