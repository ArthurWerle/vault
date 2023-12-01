import { links } from "$db/links";
import type {PageServerLoad} from './$types'

export const load: PageServerLoad = async function() {
  const data = await (await links.find().toArray()).map(link => {
    return {
      ...link,
      _id: null,
    }
  })

  console.log('data', await links.find().toArray())

	return {
		links: data
	}
}