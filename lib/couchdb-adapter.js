const nano = require("nano")("http://admin:meowmeow@localhost:5984");

const destroy = async (id, rev) => {
  const foo = nano.use("foo");
  const response = await foo.destroy(id, rev);

  return response;
};

const get = async (id) => {
  const foo = nano.use("foo");
  const response = await foo.get(id);

  return response;
};

const save = async (item) => {
  try {
    await nano.db.create("foo");
  } catch (error) {
    // NOTE: Just to ensure db exists until I find a nicer way to do this.
  }

  const foo = nano.use("foo");

  const response = await foo.insert(item, "rabbit");

  return response;
};

module.exports = {
  destroy,
  get,
  save,
};
