const express = require('express');
const router = express.Router(); //used to send all/user routes here
const HistoryC = require('../../models/HistoryC');
// We don't use app.get since /user request are sent to diff file we use router.get()

//@route GET api/customer
//@desc Test route
//@access public
router.get('/', async (req,res) => {
    const historys = await HistoryC.find();
    res.render("history", {historys: historys});
});

module.exports = router;