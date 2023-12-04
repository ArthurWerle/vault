<script>
	import './styles.css'
	import { invalidateAll, goto } from '$app/navigation'
	import { enhance, applyAction } from '$app/forms'
	import Modal from '../components/Modal.svelte'
	import Form from '../components/Form.svelte';
	
  let showModal = false
  const handleToggleModal = () => {
    showModal = !showModal
  }
</script>

<div class="flex flex-col h-screen">
	<header class="p-5 px-0 border-b-[1px] border-stone-600 bg-gray-900">
		<div class="flex justify-between max-w-screen-md m-auto">
			<a href="/">
				<h1 class="font-bold text-3xl bg-gradient-to-r bg-clip-text  text-transparent 
				from-indigo-500 via-purple-500 to-indigo-500
				animate-text active:scale-95 transition-transform">
					Vaulter
				</h1>
			</a>
	
			<div class="flex">
				<p>
					search 🔍
				</p>
				<Modal
					title="Add new bookmark"
					open={showModal}
					on:close={() => handleToggleModal()}
				>
					<svelte:fragment slot="body">
						<Form 
							action="?/add" 
							onApply={handleToggleModal}
						/>
					</svelte:fragment>
				</Modal>
				<button on:click={() => handleToggleModal()}>add new -></button>
			</div>
		</div>
	</header>

	<main class="flex flex-col flex-1 max-w-screen-md m-auto w-full">
		<slot />
	</main>

	<footer class="flex w-full p-6 border-t-[1px] border-stone-600 bg-gray-900">
		<div class="max-w-screen-md m-auto">
			<p class="text-sm"><i>
				designed & engineered by 
				<a 
					href="https://www.arthurwerle.com.br" 
					target="_blank"
					class="bg-gradient-to-r bg-clip-text  text-transparent 
						from-indigo-500 via-purple-500 to-indigo-500
						animate-text font-bold"
				>
					@arthur
				</a>
			</i></p>
		</div>
	</footer>
</div>
