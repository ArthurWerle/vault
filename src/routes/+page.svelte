<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	$: ({ links } = data)
</script>

<svelte:head>
	<title>Vault</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	{#each links as link}
		<article>
			<h2>{link.name}</h2>
		</article>
	{/each}
</section>
