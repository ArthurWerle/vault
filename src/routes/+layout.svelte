<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="flex flex-col h-screen">
	<Header />

	<main class="flex flex-1">
		<slot />
	</main>

	<footer class="flex self-center p-6">
		<p><i>
			designed & engineered by 
			<a 
				href="www.arthurwerle.com.br" 
				class="bg-gradient-to-r bg-clip-text  text-transparent 
					from-indigo-500 via-purple-500 to-indigo-500
					animate-text"
			>
				@arthur
			</a>
		</i></p>
	</footer>
</div>
