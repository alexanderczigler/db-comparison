const cassandraAdapter = require("./lib/cassandra-adapter");
const couchdbAdapter = require("./lib/couchdb-adapter");
const mongoAdapter = require("./lib/mongo-adapter");

const cassandra = cassandraAdapter
  .save({ happy: true })
  .then((id) => {
    console.log("Cassandra", "Save", id);

    return cassandraAdapter.get(id);
  })
  .then((rabbit) => {
    console.log("Cassandra", "Get", rabbit);

    return cassandraAdapter.del(rabbit.id);
  })
  .then((rabbit) => {
    console.log("Cassandra", "Del", rabbit);
  });

const couchDb = couchdbAdapter
  .save({ happy: true })
  .then((data) => {
    console.log("CouchDB", "Save", data);

    return couchdbAdapter.get(data.id);
  })
  .then((data) => {
    console.log("CouchDB", "Get", data);

    return couchdbAdapter.destroy(data._id, data._rev);
  })
  .then((data) => {
    console.log("CouchDB", "Destroy", data);
  });

const mongo = mongoAdapter
  .save({ happy: true })
  .then((data) => {
    console.log("MongoDB", "Save", data);

    return mongoAdapter.get(data.insertedId);
  })
  .then((data) => {
    console.log("MongoDB", "get", data);

    return mongoAdapter.deleteOne(data._id);
  })
  .then((data) => {
    console.log("MongoDB", "delete", data);
  });

Promise.all([cassandra, couchDb, mongo]).then(() => {
  process.exit(0);
});
