# DB Comparison

I have not worked with neither cassandra or couchdb before so I am creating a few simple CRUD operations in node to compare them to mongodb.

## Running

```shell
docker compose up
npm ci
npm start
```

## Comparison

### Query API

- Cassandra: so far it feels like working with a traditional SQL db
- CouchDB: seems pretty straightforward, not too unlike mongo etc.
- MongoDB: pretty straightforward

### Platform/language support

- Cassandra:
- CouchDB:
- MongoDB:

### Deployment options

All of them support docker and there are multiple options to pay for a managed instance or cluster in different clouds.

It's pretty straightforward to start a single instance with docker, as you can see in the `docker-compose.yaml` here.
