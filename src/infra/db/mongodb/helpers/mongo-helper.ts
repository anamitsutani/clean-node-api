import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  // we use this syntax to tell Typescript that this is a js object, not a ts type attribution
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...accountWithouId } = collection
    return Object.assign({}, accountWithouId, { id: _id })
  }
}
