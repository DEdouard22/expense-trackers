var express = require('express');
var router = express.Router();
const models = require('../server/models');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    models.User.findById(req.params.id, {
      include: [
        models.Paymentmethod
      ]
    })
    .then(user => {
      console.log(user);
      res.render('user', {
        title: "User's Page",
        user: user,
        methods: user.Paymentmethods
      });
    });
});

module.exports = router;
