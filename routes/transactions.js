var express = require('express');
var router = express.Router();
const models = require('../server/models');


/* GET users listing. */
router.get('/', function(req, res, next) {
    models.Transaction.findAll({
        where: {
            UserId: 1
        },
        include: [
            models.User,
            models.Paymentmethod
        ],
    })
    .then(transactions => {
        res.render('transactions', {
            title: 'Transactions',
            transactions: transactions
        });
    })
});

router.delete('/delete', function(req, res, next) {
    const id = req.params.id;
    models.Transaction.destroy({
        where: {id: 26}
    })
    .then(transactions => {
        res.redirect('/transactions');
        // console.log('console logging');
    });
    res.send('success!');
});

module.exports = router;
