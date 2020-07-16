<script>
	import Timer from './Timer.svelte';
	export let title;
</script>

<main>
	<h1>{title}</h1>
	<Timer timer='21' />
</main>