<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const temperatureOptions = [
    { type: "Fridge", temperature: 4 },
    { type: "Room", temperature: 20 }
  ]

  const boilOptions = [
    { type: "Soft Boiled", temperature: 65 },
    { type: "Medium Boiled", temperature: 73 },
    { type: "Hard Boiled", temperature: 85 }
  ]

  const eggOptions = ['none'];

  let egg = {
    size: 15,
    initialTemp: 4,
    waterTemp: 100,
    targetYolkTemp: 65,
  };

  const add = () => {
    dispatch('add', egg);
  };

</script> 

<section>
  <h3>Register new timer</h3>
  <form>
    <div>
      <label for="size">Size:</label>
      <select name="size" bind:value={egg.size}>
        {#each eggOptions as eggOption}
        <option value="{eggOption.size}">
          {eggOption.name}
        </option>
        {/each}
      </select>
    </div>
    <div>
      <label for="initialtemp">From:</label>
      <select name="initialtemp" bind:value={egg.initialTemp}>
        {#each temperatureOptions as tmpOption}
        <option value="{tmpOption.temperature}">
          {tmpOption.type}
        </option>
        {/each}
      </select>
    </div>
    <div>
      <label for="boil-target">I want:</label>
      <select name="boil-target" bind:value={egg.targetYolkTemp}>
        {#each boilOptions as boilOption}
        <option value="{boilOption.temperature}">
          {boilOption.type}
        </option>
        {/each}
      </select>
    </div>
    <button on:click|preventDefault={add}>Click to add</button>
  </form>
</section>

<style>

  label {
    font-size: 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  form > * {
    margin-bottom: 8px;
  }

</style>

