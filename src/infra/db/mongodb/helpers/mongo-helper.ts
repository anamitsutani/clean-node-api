import { MongoClient } from 'mongodb'

export const MongoHelper = {
  // we use this syntax to tell Typescript that this is a js object, not a ts type attribution
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
