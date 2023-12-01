import { MongoClient } from 'mongodb'
import { MONGO_URL } from '$env/static/private'

const client = new MongoClient(MONGO_URL)

export async function start_mongo() {
	console.log('Starting mongo...')
	const connection = await client.connect()

  try {
    await client.db("admin").command({ ping: 1 })
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.log('mongo error: ', e)
  }

  return connection
}

export default client.db('VaulterData')