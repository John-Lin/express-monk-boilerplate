'use strict';

let express = require('express');
let router = express.Router();

/*
 * GET userlist.
 */
router.get('/list', (req, res) => {
  let db = req.db;
  let collection = db.get('userlist');
  collection.find({}, {}, (e, docs) => {
    res.json(docs);
  });
});

/*
 * POST to adduser.
 */
router.post('/add', (req, res) => {
  let db = req.db;
  let collection = db.get('userlist');
  collection.insert(req.body, (err, result) => {
    res.sendStatus(201);
  });
});

/*
 * GET to get a single user.
 */
router.get('/:id', (req, res) => {
  let db = req.db;
  let collection = db.get('userlist');
  let userToDelete = req.params.id;
  collection.findById(userToDelete, (err, doc) => {
    res.json(doc);
  });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/:id', (req, res) => {
  let db = req.db;
  let collection = db.get('userlist');
  let userToDelete = req.params.id;
  collection.remove({ '_id' : userToDelete }, (err) => {
    res.sendStatus(204);
  });
});

module.exports = router;
