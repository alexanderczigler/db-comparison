const cassandra = require("cassandra-driver");
const { v4: uuidv4 } = require("uuid");

const contactPoints = ["localhost:9042"];
const localDataCenter = "datacenter1";
const keyspace = "ks1";

const client = new cassandra.Client({
  contactPoints, // NOTE: What nodes to connect to.
  localDataCenter, // TODO: What is this?
  keyspace, // TODO: What is this?
});

async function createKeyspace() {
  const client = new cassandra.Client({
    contactPoints,
    localDataCenter,
  });

  const query = `
    CREATE KEYSPACE IF NOT EXISTS ${keyspace}
    WITH REPLICATION = { 
      'class' : 'SimpleStrategy', 
      'replication_factor' : 1 
    };
  `;

  return client
    .execute(query)
    .then((result) => {
      console.log("Keyspace created", result);
    })
    .catch((e) => {
      console.error(e);
    });
}

async function createTable() {
  const query = `
    CREATE TABLE IF NOT EXISTS ${keyspace}.rabbits
    (
       id UUID PRIMARY KEY
      ,happy boolean
    );
  `;

  return client
    .execute(query)
    .then((result) => {
      console.log("Table created", result);
    })
    .catch((e) => {
      console.error(e);
    });
}

async function save({ happy }) {
  await createKeyspace();
  await createTable();

  const id = uuidv4();

  const query = `
    INSERT INTO ${keyspace}.rabbits (id, happy) VALUES (${id}, ?)
  `;

  return client
    .execute(query, [happy])
    .then(() => {
      return id;
    })
    .catch((e) => {
      console.error(e);
    });
}

async function del(id) {
  const query = `
    DELETE FROM ${keyspace}.rabbits WHERE id = ?
  `;

  return client
    .execute(query, [id])
    .then((result) => {
      return result;
    })
    .catch((e) => {
      console.error(e);
    });
}

async function get(id) {
  const query = `
    SELECT * FROM ${keyspace}.rabbits WHERE id = ?
  `;

  return client
    .execute(query, [id])
    .then(({ rows }) => {
      return rows[0];
    })
    .catch((e) => {
      console.error(e);
    });
}

module.exports = {
  del,
  get,
  save,
};
