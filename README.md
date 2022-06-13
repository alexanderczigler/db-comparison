# DB Comparison

I have not worked with neither cassandra nor couchbase before so I am creating a few simple CRUD operations in node to compare them to mongodb.

## Running

```shell
docker compose up
npm ci
npm start (cassandra|couchbase|mongo)
```

## Comparison

### Cassandra

Cassandra is new to me and my first impression is that it feels a lot like working with a traditional SQL database, like mysql or postgres. Getting started was rather straightforward. It is a good sign that cassandra is easy to run inside docker on my laptop and is available as a managed database in all major clouds as well.

#### Pros

- Very straightforward if you are familiar with SQL
- Straightforward docker deployment
- Has several managed hosting options

#### Cons

- A bit of a learning curve if you are unfamiliar with SQL
- You need to create a keyspace before you can store data

### Couchbase

TODO: summarize.

#### Pros

- Docker image has a web UI for administration

#### Cons

- Needs a few clicks in the web UI before you can start using it

### MongoDB

MongoDB provides good developer experience right from the start and can grow organically as the requirements increase over time. In cases where traffic or complexity gets very high mongodb may become a limitation. In my experience there will be enough time to mitigate such issues by for example switching to another database engine.

#### Pros

- Super simple setup
- Low learning curve if you are familiar with json

#### Cons

- The way mongodb stores data and the lack of joins may have implications in the long run
