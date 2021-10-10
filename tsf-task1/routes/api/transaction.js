const express = require('express');
const router = express.Router();
const UserC = require('../../models/UserC'); 
const TransC = require('../../models/TransC'); 
const HistoryC = require('../../models/HistoryC');
const {check, validationResult} = require('express-validator')

router.get('/', (req,res) => {
    res.render('transaction');
});
router.post('/', [
    check('account1', 'account is required').not().isEmpty(),
    check('amount', 'amount is required').not().isEmpty(),
    check('account2', 'account is required').not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try{
        let transC = new TransC({
            account1: req.body.account1,
            amount: req.body.amount,
            account2: req.body.account2
        })

        let customer1 = await UserC.findOne({account: transC.account1})
        let customer2 = await UserC.findOne({account: transC.account2})
        if(!customer1 || !customer2){
            res.send("No account");
        }
        let update1;
        update1 = {balance: customer1.balance - transC.amount};
        customer1 = await UserC.findOneAndUpdate({account: transC.account1}, update1,{
            new: true
        });
        let update2;
        update2 = {balance: customer2.balance + transC.amount};
        customer2 = await UserC.findOneAndUpdate({account: transC.account2}, update2,{
            new: true
        });
        let historyC = new HistoryC({
            account1: transC.account1,
            account2: transC.account2,
            amount: req.body.amount
        })
        await historyC.save().then()
        //res.send([update1,update2, customer1,customer2]);
        res.redirect('/api/customers');
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
});



module.exports = router;


// router.post('/', [
//     check('account1', 'account is required').not().isEmpty(),
//     check('amount', 'amount is required').not().isEmpty(),
//     check('account2', 'account is required').not().isEmpty()
// ], async (req,res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({errors: errors.array() });
//     }
//     try{
//         let transC = new TransC({
//             account1: req.body.account1,
//             amount: req.body.amount,
//             account2: req.body.account2
//         })

//         let customer1 = await UserC.findOne({account: transC.account1})
//         let customer2 = await UserC.findOne({account: transC.account2})
//         if(!customer1 || !customer2){
//             res.send("No account");
//         }
//         else if(customer1.balance - transC.amount < 2000){

//         }
//         else {
//             let update = {balance: customer1.balance - transC.amount};
//             customer1 = await UserC.findOneAndUpdate({account: transC.account1}, update,{
//                 new: true
//             });
//             update = {balance: customer2.balance + transC.amount};
//             customer2 = await UserC.findOneAndUpdate({account: transC.account2}, update,{
//                 new: true
//             });
//             res.redirect('/api/customers');
//         }
        
        
//     }
//     catch(err) {
//         console.log(err.message);
//         res.status(500).send('Server error')
//     }
// });