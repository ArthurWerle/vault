<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="flex flex-col">
	<Header />

	<main class="flex flex-1">
		<slot />
	</main>

	<footer class="flex flex-1">
		<p>built with ♥️ by <a href="www.arthurwerle.com.br">arthur</a></p>
	</footer>
</div>
