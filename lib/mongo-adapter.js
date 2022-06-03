const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "foo";

async function deleteOne(id) {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("documents");

  return await collection.deleteOne({ _id: id });
}

async function get(id) {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("documents");

  return await collection.findOne({ _id: id });
}

async function save(item) {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("documents");

  return await collection.insertOne(item);
}

module.exports = {
  deleteOne,
  get,
  save,
};
