<script>
	import { onMount } from 'svelte';
	import Timer from './Timer.svelte';
	import RegisterTimer from './RegisterTimer.svelte';

	export let timers;
	let id = 0;
	let userLocation;
	let userLocationSet = false;

	const genId = () => {
		id = id + 1;
		return id;
	}

	const getPosition = (locator) => {
		return new Promise((resolve, reject) => {
			locator.getCurrentPosition(resolve, reject);
		});
	}

	const setLocation = async () => {
		const geo = navigator.geolocation;
		if(!geo) {
			console.log('Be nice and accept.');
		} else {
			userLocation = (await getPosition(geo)).coords;
		}
	}

	const addTimer = (event) => {
		const newTimer = { 
			id: genId(), 
			secondsRemaining: toSecondsRounded(calculateCookingTime(event.detail))
		};
		timers = [...timers, newTimer];
	};

	const toSecondsRounded = (minutes) => {
		const asString = Math.round( ((minutes * 60) * 100) / 100).toFixed(2);
		return parseFloat(asString);
	}

	const calculateCookingTime = (eggData) => {
		const coeff = 0.15 * ((eggData.size / Math.PI) ** 2);
		const toLn = (2 * (eggData.waterTemp - eggData.initialTemp) / (eggData.waterTemp - eggData.targetYolkTemp));
		return coeff * Math.log(toLn);
	}
</script>

<style>
	main {
		width: 50%;
		margin: auto;
	}

	main h1 {
		margin-left: 30%;
	}

	ul {
		list-style-type: none;
		width: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		width: 70%;
	}

</style>

<main>
	<h1>Egg</h1>
	{#if !userLocationSet}
		<p>This app works best with geolocation enabled. Would you like to enable this now?</p>
		<button on:click={() => { userLocationSet = true; setLocation(); } }>Yes please!</button>
	{:else}
		<div class="content">
			<RegisterTimer on:add={addTimer} userlocation={userLocation} />
			<ul>
			{#each timers as timer (timer.id)}
				<Timer bind:secondsRemaining={timer.secondsRemaining} />
			{/each}
			</ul>
		</div>
	{/if}
</main>