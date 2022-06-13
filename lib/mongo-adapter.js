const { MongoClient } = require("mongodb");
const Adapter = require("./adapter");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "cats";

class MongoAdapter extends Adapter {
  async create(data) {
    super.create(data);

    const db = client.db(dbName);
    const collection = db.collection("my-cats");

    const { insertedId } = await collection.insertOne(data);

    return insertedId;
  }

  async read(key) {
    super.read(key);

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("my-cats");

    const cat = await collection.findOne({ _id: key });

    cat.id = cat._id; // NOTE: Workaround.
    return cat;
  }

  async update(key, data) {
    super.update(key, data);
    return {
      id: key,
      ...data,
    };
    // TODO: implement
  }

  async delete(key) {
    super.delete(key);

    const db = client.db(dbName);
    const collection = db.collection("my-cats");

    return await collection.deleteOne({ _id: key });
  }
}

module.exports = new MongoAdapter();
