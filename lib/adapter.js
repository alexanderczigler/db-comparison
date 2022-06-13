class Adapter {
  create(data) {
    console.log("> Create", data);
  }
  read(id) {
    console.log("> Read", id);
  }
  update(id, data) {
    console.log("> Update", id, data);
  }
  delete(id) {
    console.log("> Delete", id);
  }
}

module.exports = Adapter;
