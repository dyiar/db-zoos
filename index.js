const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const server = express();

server.use(express.json());
server.use(helmet());

// connect to database
const db = knex(knexConfig.development);

// endpoints here

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoo => {
      res.status(200).send(zoo);
    })
    .catch(() => res.status(500).send({ error: "Couldn't retrieve data." }));
});

server.get("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .then(zoo => {
      if (zoo.length) {
        res.status(200).send(zoo);
      } else {
        res.status(404).send({ error: "Data not found." });
      }
    })
    .catch(() => res.status(500).send({ error: "Couldn't retrieve data." }));
});

server.post("/api/zoos", (req, res) => {
  db("zoos")
    .insert(req.body)
    .then(ids => {
      db("zoos")
        .where({ id: ids[0] })
        .then(zoo => {
          res.status(201).send(zoo);
        });
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
});

server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;

  db("zoos")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).send({ error: "Data not found." });
      }
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
});

server.delete("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).send({ error: "Data not found." });
      }
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be deleted." }));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
