//Note all routes in this folder is going to return json
//this routes allows has registering users adding them

const express = require('express');
const router = express.Router(); //used to send all/user routes here
const {check, validationResult} = require('express-validator') //it won't accept data if user forgets to send data of required files
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');


const UserC = require('../../models/UserC');

// We don't use app.get() since /user request are sent to diff file we use router.get()

//@route POST api/users
//@desc register user
//@access public
router.post('/', [
    check('account', 'account is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('balance', 'balance is required').not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    //that is the object of data send to the route
    /*In order  to make req.body to work we need to have a middleware
    for the body parser
    */
    
    
    const {account, name, email, balance} = req.body;

    //query that returns a promise if it finds something with same schema
    try{
        //see if user already exists
        let user = await UserC.findOne({email: email});
        if(user){ //if user exixst with same mail
            return res.status(400).json({ errors: [{msg: 'User already exists'}]});
        }



        //take the user created at beginning of try{} to create an user instance

        userC = new UserC({
            account,
            name,
            email,
            balance
        })
        //the above code only creates the instance it doesn't save


        //Encrypt password

        

        await userC.save().then()
        //return jsonwebtoken
        res.send("user registered");
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;