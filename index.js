const couchdbAdapter = require("./lib/couchdb-adapter");
const mongoAdapter = require("./lib/mongo-adapter");

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

Promise.all([couchDb, mongo]).then(() => {
  process.exit(0);
});
