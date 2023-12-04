import { JSON_LINK_KEY } from '$env/static/private'

export async function getMetadata(url: string) {
  try {
    const apiUrl = `https://jsonlink.io/api/extract?url=${url}&api_key=${JSON_LINK_KEY}`
    const response = await fetch(apiUrl)
    const metadata = await response.json()

    return metadata
  } catch (e) {
    console.log('error extracting metadata', e)
  }

}