<script lang="ts">
	import type { PageData } from './$types'
	import Modal from '../components/Modal.svelte'
	
  let showModal = false
  const handleToggleModal = () => {
    showModal = !showModal
  }

	export let data: PageData

	$: ({ links } = data)
</script>

<svelte:head>
	<title>Vault</title>
	<meta name="description" content="Keep all your bookmarks in one place. Keep them in Vaulter." />
</svelte:head>

<button on:click={() => handleToggleModal()}>Open modal</button>

<Modal
  title="Edit your details"
  open={showModal}
  on:close={() => handleToggleModal()}
>
  <svelte:fragment slot="body">
    This is content inside my modal! 👋
  </svelte:fragment>
</Modal>

<section>
	{#each links as link}
		<article>
			<a href={link.url} title={link.title} target="_blank">	
				<h2>{link.title}</h2>
			</a>
		</article>
	{/each}
</section>
