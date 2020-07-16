<script>
	import Timer from './Timer.svelte';
	import RegisterTimer from './RegisterTimer.svelte';

	export let title;
	export let timers;
	let id = 0;

	const genId = () => {
		id = id + 1;
		return id;
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

</style>

<main>
	<h1>{title}</h1>
	<RegisterTimer on:add={addTimer}/>
	<ul>
		{#each timers as timer (timer.id)}
			<Timer bind:secondsRemaining={timer.secondsRemaining} />
		{/each}
	</ul>

</main>