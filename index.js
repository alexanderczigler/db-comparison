const mongoAdapter = require("./lib/mongo-adapter");

mongoAdapter
  .save({ meow: "purr" })
  .then(() => {
    console.log("saved");

    return mongoAdapter.get();
  })
  .then((data) => {
    console.log(data);
    process.exit(0);
  });
