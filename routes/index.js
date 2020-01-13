var express = require('express');
var router = express.Router();
// const models = require('../mod');

var getAllClients = require('../api/clients/clients.controller');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/users', (req, res) => {
//   console.log('in api');
//   models.Users.findAll()
//     .then(a => res.json(a))
// })

// router.get('/clients', (req, res) => {
//   console.log('in api');
//   models.Clients.findAll()
//     .then(a => res.json(a))
// })

// router.get('/plots', (req, res) => {
//   console.log('in api');
//   models.Plots.findAll()
//     .then(a => res.json(a))
// })

module.exports = router;
