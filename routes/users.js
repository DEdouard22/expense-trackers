var express = require('express');
var router = express.Router();
const models = require('../server/models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.User.findAll()
    .then(users => {
      res.render('users', { title: 'All Users Page', users: users});
    });
});

module.exports = router;
