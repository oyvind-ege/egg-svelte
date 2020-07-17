<script>
  import { createEventDispatcher, onMount } from 'svelte';

  export let userlocation;

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

  let egg = {
    size: 15,
    initialTemp: 4,
    waterTemp: 100,
    targetYolkTemp: 65,
  };

  let eggOptions = [{ type: "Loading...", temperature: 65 }];

  const setEggOptions = async () => {
    const response = await (await fetch('http://localhost:8080/api/regions')).json();
    return response.data[0].eggs;
  }

  const calculateBoilingPointFromElevation = (elevation) => {
    return 100 - ((elevation / 150) * 0.5);
  }

  onMount(async () => {
    eggOptions = await setEggOptions();
    console.log('Mounting register', userlocation, typeof userlocation);
    const elevation = await (await fetch(`http://localhost:8080/api/elevations/${userlocation.latitude}/${userlocation.longitude}`)).json();
    egg.waterTemp = calculateBoilingPointFromElevation( elevation.data.elevation );
    console.log('Water temp set to', egg.waterTemp, 'for elevation of', elevation.data.elevation);
  });

  const add = () => {
    dispatch('add', egg);
  };

</script> 

<style>
  section {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    border: 0.5px solid #5C3A89;
    background-color: #F3E97C;
    padding-left: 20px;
    width: 100%;
  }

  h3 {
    margin-bottom: 25px;
  }

  form {
    display: flex;
    width: 90%;
    flex-direction: column;
  }

  form > * {
    margin-bottom: 8px;
  }

  form > button {
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
  }

  label {
    display: flex;
    flex-direction: row;
    text-align: left;
    font-size: 15px;
  }

  select {
    height: 20px;
    flex: 0 0 200px;
    margin-left: 10px;
  }
</style>

<section>
  <h3>Register new timer</h3>
  <form>
    <div>
      <label for="size">Size:
        <select name="size" bind:value={egg.size}>
          {#each eggOptions as eggOption}
          <option value="{eggOption.size}">
            {eggOption.name}
          </option>
          {/each}
        </select>
      </label>
    </div>
    <div>
      <label for="initialtemp">From:
        <select name="initialtemp" bind:value={egg.initialTemp}>
          {#each temperatureOptions as tmpOption}
          <option value="{tmpOption.temperature}">
            {tmpOption.type}
          </option>
          {/each}
        </select>
      </label>
    </div>
    <div>
      <label for="boil-target">I want:
        <select name="boil-target" bind:value={egg.targetYolkTemp}>
          {#each boilOptions as boilOption}
          <option value="{boilOption.temperature}">
            {boilOption.type}
          </option>
          {/each}
        </select>
      </label>
    </div>
    <button on:click|preventDefault={add}>Click to add</button>
  </form>
</section>


