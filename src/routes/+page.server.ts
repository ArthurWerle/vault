import { links } from "$db/links";
import type { PageServerLoad } from './$types'

type Link = {
  _id: string
  title: string
  url: string
  pinned: boolean
  notes: string
}

export const load: PageServerLoad = async function()  {
  const data = await links.find().toArray()

	return {
		links: data.map((item: any) => {
      return {
        ...item,
        pinned: Boolean(item.pinned),
        _id: item._id.toString()
      }
    })
	} as { links: Link[] }
}