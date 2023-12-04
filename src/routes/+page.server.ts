import { links } from "$db/links";
import { ObjectId } from "mongodb";

import type { PageServerLoad } from './$types'
import { fail } from "@sveltejs/kit";
import { getMetadata } from "$util/getMetadata";

export type Bookmark = {
  _id: string
  title: string
  url: string
  pinned: boolean
  notes: string
  metadata: any
}

export const load: PageServerLoad = async function()  {
  const data = await links.find().toArray()

  const bookmarks = await Promise.all(data.map(async item => {
    const metadata = await getMetadata(item.url)

    return {
      ...item,
      pinned: Boolean(item.pinned),
      metadata,
      _id: item._id.toString()
    }
  }))

	return {
		bookmarks
	} as { bookmarks: Bookmark[] }
}

/** @type {import('./$types').Actions} */
export const actions = {
	add: async (event) => {
    const formData = await event.request.formData()
    const url = formData.get('url')

    if (!url) return fail(400, { url, missing: true })

    try {
      const result = await links.insertOne({
        url,
        title: formData.get('title'),
        notes: formData.get('notes'),
        pinned: formData.get('pinned') ? 1 : 0,
      })
      
      console.log('register added!', result)
      return { success: true }
    } catch (e) {
      console.log('insert register error:', e)
      return { success: false }
    }
	},
	update: async (event) => {
    const formData = await event.request.formData()
    console.log('formData', formData)

    const id = formData.get("_id")
    if (!id) return fail(400, { id, missing: true })

    const url = formData.get('url')
    if (!url) return fail(400, { url, missing: true })

    const filter = {
      _id: new ObjectId(id as string)
    }

    const options = {
      upsert: false
    }

    const updateDoc = {
      $set: {
        title: formData.get('title'),
        url,
        notes: formData.get('notes'),
        pinned: formData.get('pinned') ? 1 : 0
      }
    }

    try {
      const result = await links.updateOne(filter, updateDoc, options)
      
      if (result.modifiedCount === 1) {
        console.log("Successfully updated one document.");
      } else {
        console.log("No documents matched the query. Updated 0 documents.");
      }

      return { success: true }
    } catch (e) {
      console.log('update register error:', e)
      return { success: false }
    }
	}
};