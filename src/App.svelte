<script>
	import Timer from './Timer.svelte';
	import RegisterTimer from './RegisterTimer.svelte';

	export let title;

	export let timers;

	const addTimer = (event) => {
		console.log('Creating timer:', event.detail);
		const eggData = event.detail;
		console.log('Cooking time:', calculateCookingTime(eggData));
		console.log('In seconds: ', toSecondsRounded(calculateCookingTime(eggData)))
		timers = [...timers, { secondsRemaining: toSecondsRounded(calculateCookingTime(eggData))}];
	};

	const toSecondsRounded = (minutes) => {
		const asString = Math.round( ((minutes * 60) * 100) / 100).toFixed(2);
		return parseFloat(asString);
	}

	const calculateCookingTime = (data) => {
		const coeff = 0.15 * ((data.size / Math.PI) ** 2);
		const toLn = (2 * (data.waterTemp - data.initialTemp) / (data.waterTemp - data.targetYolkTemp));
		return coeff * Math.log(toLn);
	}
</script>

<main>
	<h1>{title}</h1>
	<RegisterTimer on:add={addTimer}/>
	{#each timers as timer (timer.id)}
		<Timer secondsRemaining={timer.secondsRemaining} />
	{/each}
</main>