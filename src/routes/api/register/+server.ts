import { links } from '$db/links'
import { ObjectId } from 'mongodb'
import { error, json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ request }) {	
  const { id } = await request.json()

	try {
		const result = await links.deleteOne({ _id: new ObjectId(id) })

		if (result.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
		
		return json('success')
	} catch (e) {
		console.log('delete register error:', e)
		throw error(500, 'delete register error')
	}
}