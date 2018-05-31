'use strict';

import express from 'express';
const router = express.Router();

import modelFinder from '../middleware/model.js';
router.param('model', modelFinder);


// GET routes
router.get('/api/v1/:model', (req, res, next) => {
  console.log(`${req.model}`);
  req.model.find({})
  .then(data => sendJSON(res, data))
  // .catch(next);
  .catch(console.log);

});

router.get('/api/v1/:model/:id', (req, res, next) => {
  // console.log(`Model: ${req.model}`);
  // let output = {route: 'get /api/v1/:model:id', model: req.params.model};
  // sendJSON(res, output);

  req.model.findById(req.params.id)
  .then(data => sendJSON(res, data))
  .catch(next);
});


// POST routes
router.post('/api/v1/:model', (req, res, next) => {
  // let output = {route: 'post req.params.model:id', model: req.params.model, data: req.body};
  // sendJSON(res, output);

  let record = new req.model(req.body);
  record.save()
  .then(data => sendJSON(res, data))
  .catch(next);
});


// DELETE routes
router.delete('/api/v1/:model/:id', (req, res, next) => {
  // let output = {route: 'delete /api/v1/:model:id', model: req.params.model};
  // next('You screwed up!');
  // sendJSON(res, output);

  req.model.findOneAndDelete(req.params.id)
  .then(data => sendJSON(res, data))
  .catch(next);
});



// Helper methods
let sendJSON = (res, data) => {
  res.statusCode = 200;
  res.statusMessage = "OK";
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(data));
  res.end();
}

export default router;
