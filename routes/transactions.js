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
            transactions: transactions,
        });
    })
});

router.get('/delete/:id', function(req, res, next) {
    const id = req.params.id;
    models.Transaction.destroy({
        where: {id: id}
    })
    .then(transactions => {
        res.redirect('/transactions');
    });
});

// router.get('/edit/:id', function(req, res, next) {
//     const id = req.params.id;
//     models.Transaction.findById({
//         where: {id: id}
//     })
//     .then(transactions => {
//         res.render('edittransaction', {
//             title: 'Edit Transaction'
//     });
// });

//add a button to go back to transactions


//edit needs to be a get, create a new view with the edit details
//when click save, use findbyID to find the one you need to update,
//in the then function, send the transaction and do transaction.update.
//that takes an object of the things you wnat to update

module.exports = router;
