const couchbaseAdapter = require("./lib/couchbase-adapter");
const mongoAdapter = require("./lib/mongo-adapter");

console.log(`Using adapter ${process.argv[2]}`);
let adapter;

const adapterName = process.argv[2];
switch (adapterName) {
  case "cassandra":
    adapter = cassandraAdapter;
    break;
  case "couchbase":
    adapter = couchbaseAdapter;
    break;
  case "mongo":
    adapter = mongoAdapter;
    break;
}

adapter
  .create({ breed: "Persian Tabby" })
  .then((id) => {
    return adapter.read(id);
  })
  .then((cat) => {
    console.log("Cat", cat);
    console.log();

    cat.color = "Orange";
    return adapter.update(cat.id, { breed: "Persian Tabby", color: "Orange" });
  })
  .then((cat) => {
    return adapter.read(cat.id);
  })
  .then((cat) => {
    console.log("Cat updated", cat);
    console.log();

    return adapter.delete(cat.id);
  })
  .then((result) => {
    console.log("Deleted", result);
    console.log();

    process.exit(0);
  });
