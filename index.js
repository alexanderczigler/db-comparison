const couchdbAdapter = require("./lib/couchdb-adapter");
const mongoAdapter = require("./lib/mongo-adapter");

couchdbAdapter
  .save({ happy: true })
  .then((data) => {
    console.log("CouchDB", "Save", data);

    return couchdbAdapter.get(data._id);
  })
  .then((data) => {
    console.log("CouchDB", "Get", data);

    return couchdbAdapter.destroy(data._id, data._rev);
  })
  .then((data) => {
    console.log("CouchDB", "Destroy", data);
    process.exit(0);
  });

mongoAdapter
  .save({ meow: "purr" })
  .then((data) => {
    console.log("MongoDB", "Save", data);

    return mongoAdapter.get();
  })
  .then((data) => {
    console.log(data);
    process.exit(0);
  });
