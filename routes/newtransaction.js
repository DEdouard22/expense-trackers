var express = require('express');
var router = express.Router();
const models = require('../server/models');


/* GET users listing. */
router.get('/', function(req, res, next) {
    models.Paymentmethod.findAll()
        .then(methods => {
            res.render('newtransaction', {
                title: 'Add a Transaction',
                methods: methods
            });
        })
});

router.post('/', (req, res) => {
    if (!req.body.description) {
        return res.render('error', {
            message: 'No description provided',
            error: {
                status: 'You must provide a description to submit a new transaction',
                stack: null,
            }
        })
    }
    if (!req.body.amount) {
        return res.render('error', {
            message: 'No amount provided',
            error: {
                status: 'You must provide an amount to submit a new transaction',
                stack: null,
            }
        })
    }
    if (!req.body.description) {
        return res.render('error', {
            message: 'No frequency provided',
            error: {
                status: 'You must provide a frequency to submit a new transaction',
                stack: null,
            }
        })
    }
    if (!req.body.type) {
        return res.render('error', {
            message: 'No type provided',
            error: {
                status: 'You must provide a type to submit a new transaction',
                stack: null,
            }
        })
    }
    models.Transaction.create({
        description: req.body.description,
        amount: req.body.amount,
        frequency: req.body.frequency,
        PaymentmethodId: req.body.paymentMethod,
        category: req.body.category,
        type: req.body.type,
        // UserId: req.user,
        UserId: 1,
    })
        .then(transactions => {
            // res.status(201).send(transactions);
            res.redirect('/transactions');
        })
});

module.exports = router;
