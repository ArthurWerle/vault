<script>
	import { page } from '$app/stores'
</script>

<h1>Error page: {$page.status}: {$page?.error?.message}</h1>