const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const router = express.Router();

// middleware

function checkIdExists(req, res, next) {
  db("bears")
    .where({ id: req.params.id })
    .then(count => {
      if (count) {
        console.log("check1");
        next();
      } else {
        res.status(404).send({ error: "The ID doesn't exist." });
      }
    });
}

// endpoints

router.get("/", (req, res) => {
  db("bears")
    .then(action => {
      res.status(200).send({ action });
    })
    .catch(() =>
      res.status(500).send({ error: "The data couldn't be retrieved." })
    );
});

router.get("/:id", (req, res) => {
  db("bears")
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

router.post("/", (req, res) => {
  db("bears")
    .insert(req.body)
    .then(ids => {
      db("bears")
        .where({ id: ids[0] })
        .then(bear => {
          res.status(201).send({bear});
        });
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
});

router.put("/:id", checkIdExists, (req, res) => {
  const changes = req.body;

  db("bears")
    .where({ id: req.params.id })
    .update(changes)
    .then(() => {
      res.status(200).send("1");
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
});

router.delete("/:id", checkIdExists, (req, res) => {
  db("bears")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).send({ count });
    })
    .catch(() => res.status(500).send({ error: "Data couldn't be deleted." }));
});

module.exports = router;
