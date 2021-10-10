//Note all routes in this folder is going to return json
//this routes allows has registering users adding them

const express = require('express');
const router = express.Router(); //used to send all/user routes here
const UserC = require('../../models/UserC'); 


// We don't use app.get since /user request are sent to diff file we use router.get()

//@route GET api/customer
//@desc Test route
//@access public
router.get('/', async (req,res) => {
    const customers = await UserC.find();
    res.render("customers", {customers: customers});
});

module.exports = router;