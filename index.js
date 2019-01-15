const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const zoosRoutes = require("./zoosRoutes/zoosRoutes");
const bearsRoutes = require("./bearsRoutes/bearsRoutes");

const server = express();

server.use(express.json());
server.use(helmet());

// connect to database
const db = knex(knexConfig.development);

// endpoints here

server.use("/api/zoos", zoosRoutes);
server.use("/api/bears", bearsRoutes);

// server.get("/api/zoos", (req, res) => {
//   db("zoos")
//     .then(zoo => {
//       res.status(200).send(zoo);
//     })
//     .catch(() => res.status(500).send({ error: "Couldn't retrieve data." }));
// });

// server.get("/api/zoos/:id", (req, res) => {
//   db("zoos")
//     .where({ id: req.params.id })
//     .then(zoo => {
//       if (zoo.length) {
//         res.status(200).send(zoo);
//       } else {
//         res.status(404).send({ error: "Data not found." });
//       }
//     })
//     .catch(() => res.status(500).send({ error: "Couldn't retrieve data." }));
// });

// server.post("/api/zoos", (req, res) => {
//   db("zoos")
//     .insert(req.body)
//     .then(ids => {
//       db("zoos")
//         .where({ id: ids[0] })
//         .then(zoo => {
//           res.status(201).send(zoo);
//         });
//     })
//     .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
// });

// server.put("/api/zoos/:id", (req, res) => {
//   const changes = req.body;

//   db("zoos")
//     .where({ id: req.params.id })
//     .update(changes)
//     .then(count => {
//       if (count) {
//         res.status(200).send({count});
//       } else {
//         res.status(404).send({ error: "Data not found." });
//       }
//     })
//     .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
// });

// server.delete("/api/zoos/:id", (req, res) => {
//   db("zoos")
//     .where({ id: req.params.id })
//     .del()
//     .then(count => {
//       if (count) {
//         res.status(200).json(count);
//       } else {
//         res.status(404).send({ error: "Data not found." });
//       }
//     })
//     .catch(() => res.status(500).send({ error: "Data couldn't be deleted." }));
// });

// server.get("/api/bears", (req, res) => {
//   db("bears")
//     .then(bear => {
//       res.status(200).send(bear);
//     })
//     .catch(() => res.status(500).send({ error: "Couldn't retrieve data." }));
// });

// server.get("/api/bears/:id", (req, res) => {
//   db("bears")
//     .where({ id: req.params.id })
//     .then(bear => {
//       if (bear.length) {
//         res.status(200).send(bear);
//       } else {
//         res.status(404).send({ error: "Data not found." });
//       }
//     })
//     .catch(() => res.status(500).send({ error: "Couldn't retrieve data." }));
// });

// server.post("/api/bears", (req, res) => {
//   db("bears")
//     .insert(req.body)
//     .then(ids => {
//       db("bears")
//         .where({ id: ids[0] })
//         .then(bear => {
//           res.status(201).send(bear);
//         });
//     })
//     .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
// });

// server.put("/api/bears/:id", (req, res) => {
//   const changes = req.body;

//   db("bears")
//     .where({ id: req.params.id })
//     .update(changes)
//     .then(count => {
//       if (count) {
//         res.status(200).json(count);
//       } else {
//         res.status(404).send({ error: "Data not found." });
//       }
//     })
//     .catch(() => res.status(500).send({ error: "Data couldn't be saved." }));
// });

// server.delete("/api/bears/:id", (req, res) => {
//   db("bears")
//     .where({ id: req.params.id })
//     .del()
//     .then(count => {
//       if (count) {
//         res.status(200).send({ count });
//       } else {
//         res.status(404).send({ error: "Data not found." });
//       }
//     })
//     .catch(() => res.status(500).send({ error: "Data couldn't be deleted." }));
// });

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
