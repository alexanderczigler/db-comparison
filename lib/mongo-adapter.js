const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "foo";

async function get(item) {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("documents");

  return await collection.find({}).toArray();
}

async function save(item) {
  await client.connect();

  const db = client.db(dbName);
  const collection = db.collection("documents");

  await collection.insertOne(item);

  return true;
}

module.exports = {
  get,
  save,
};
