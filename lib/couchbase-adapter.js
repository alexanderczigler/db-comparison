const couchbase = require("couchbase");
const Adapter = require("./adapter");

const connect = async () => {
  const cluster = await couchbase.connect("couchbase://127.0.0.1", {
    username: "username",
    password: "password",
  });

  const bucket = cluster.bucket("default");

  const defaultCollection = bucket.defaultCollection();
  return defaultCollection;
};

class CouchbaseAdapter extends Adapter {
  async create(data) {
    super.create(data);

    const key = "Garfield";

    const collection = await connect();
    await collection.insert(key, data);

    return key;
  }

  async read(key) {
    super.read(key);

    const collection = await connect();
    const cat = await collection.get(key);

    cat.id = key; // NOTE: Workaround, couchbase does not set id/key on the object.

    return cat;
  }

  async update(key, data) {
    super.update(key, data);

    const collection = await connect();
    const cat = await collection.replace(key, data);

    cat.id = key; // NOTE: Workaround, couchbase does not set id/key on the object.

    return cat;
  }

  async delete(key) {
    super.delete(key);

    const collection = await connect();
    await collection.remove(key);

    return true;
  }
}

module.exports = new CouchbaseAdapter();
