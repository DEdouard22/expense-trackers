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

//Posting payment methods to user page
router.post('/', (req, res) => {
  models.Paymentmethods.create({
    PaymentmethodId: req.body.paymentMethod,
    UserId: req.user,
})

.then(transactions => {
    // res.status(201).send(transactions);
    res.redirect('/user');
})

// Testing redirect from succesfull login
router.post('/', function (req, res) {
  //Checks for Login Method
  console.log(req.body);
  if (req.body.email !== null) {
    console.log('Some one logged in with an email');
    models.User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      },
      include: [
        models.Paymentmethod
      ]
    })
    .then(user => {
      res.render('user', {
        title: "User's Page",
        user: user,
        methods: user.Paymentmethods
      });
    })
  }
  else if (req.body.github_id !== null) {
    console.log('Someone logged in with GitHub');
    models.User.findOne({
      where: {
        github_id: req.body.github_id
      },
      include: [
        models.Paymentmethod
      ]
    })
    .then(user => {
      res.render('user', {
        title: "User's Page",
        user: user,
        methods: user.Paymentmethods
      });
    })
  }
  else if (req.body.facebook_id !== null) {
    console.log('Someone logged in with Facebook');
    models.User.findOne({
      where: {
        facebook_id: req.body.facebook_id
      },
      include: [
        models.Paymentmethod
      ]
    })
    .then(user => {
      res.render('user', {
        title: "User's Page",
        user: user,
        methods: user.Paymentmethods
      });
    })
  }
  else{
    res.redirect('/login');
  }

});

module.exports = router;
