import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		title: 'Egg'
	}
});

export default app;