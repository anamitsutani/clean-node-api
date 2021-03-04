import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  // we use this syntax to tell Typescript that this is a js object, not a ts type attribution
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...accountWithouId } = collection
    return Object.assign({}, accountWithouId, { id: _id })
  }
}
