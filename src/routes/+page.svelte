<script lang="ts">
	import type { PageData } from './$types'
	import { invalidateAll } from '$app/navigation'
	import { applyAction, deserialize } from '$app/forms'
	import Modal from '../components/Modal.svelte'
	import Form from '../components/Form.svelte'
	import type { Bookmark } from './proxy+page.server'
	
	export let data: PageData
	let selectedBookmark: Bookmark | null = null

	async function deleteRegister(id: string) {
		const response = await fetch('/api/register', {
			method: 'DELETE',
			body: JSON.stringify({ id: id }),
			headers: {
				'content-type': 'application/json'
			}
		})

		/** @type {import('@sveltejs/kit').ActionResult} */
		const result = deserialize(await response.text())

		if (response.status === 200 ) await invalidateAll()

		applyAction(result)
	}

  let showModal = false
  const handleToggleEditModal = () => {
    showModal = !showModal
  }

	$: ({ bookmarks } = data)
</script>

<svelte:head>
	<title>Vault</title>
	<meta name="description" content="Keep all your bookmarks in one place. Keep them in Vaulter." />
</svelte:head>

<Modal
	title="Edit bookmark"
	open={showModal}
	on:close={() => {
		handleToggleEditModal()
		selectedBookmark = null
	}}
>
	<svelte:fragment slot="body">
		<Form 
			action="?/update" 
			bookmark={selectedBookmark}
			onApply={handleToggleEditModal}
		/>
	</svelte:fragment>
</Modal>

<section class="flex flex-col gap-4 p-5 px-0 justify-start overflow-auto">
	{#each bookmarks as bookmark}
		<article class="p-4 px-0 flex w-full justify-between">
			<a href={bookmark.url} title={bookmark.title} target="_blank">	
				<h2>{bookmark.title}</h2>
				<h3>{JSON.stringify(bookmark.metadata)}</h3>
			</a>
			<div class="flex gap-2">
				<button 
					on:click={() => {
						selectedBookmark = bookmark
						handleToggleEditModal()
					}} 
					class="font-bold text-sm hover:brightness-75"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21H5Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4l-9.3 9.3Z"/></svg>
				</button>
				<button on:click={() => deleteRegister(bookmark._id)} class="font-bold text-sm hover:brightness-75">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21H7Zm2-4h2V8H9v9Zm4 0h2V8h-2v9Z"/></svg>
				</button>
			</div>
		</article>
	{/each}
</section>
