<script lang="ts">
	import { applyAction, enhance } from "$app/forms"
	import { invalidateAll } from "$app/navigation"
	import type { Bookmark } from "../routes/proxy+page.server"

  export let method = 'POST'
  export let action = '/'
  export let onApply: any = null
  export let bookmark: Bookmark | null = null

</script>

<form 
  method={method} 
  action={action} 
  use:enhance={({ formElement, formData, action, cancel, submitter }) => {		
    if (bookmark?._id) formData.append("_id", bookmark._id)
    
    return async ({ result, update }) => {
      await applyAction(result).then(() => {
        onApply?.()
        invalidateAll()
      })
    }
  }}
>
  <div>
    <label>
      URL
      <input name="url" type="text" value={bookmark?.url || ""}>
    </label>
  </div>
  <div>
    <label>
      Title
      <input name="title" type="text" value={bookmark?.title || ""}>
    </label>
  </div>
  <div>
    <label>
      Notes
      <input name="notes" type="text" value={bookmark?.notes || ""}>
    </label>
  </div>
  <div>
    <label>
      Pin
      <input name="pinned" type="checkbox" checked={bookmark?.pinned || false}>
    </label>
  </div>
  <button>add</button>
</form>