//main entry file

const express = require('express'); //include entry file
const connectDB = require('./config/db');
const app = express(); // initialize

//connect database
connectDB();

app.use( express.static( "public" ) );
// Init Middleware
app.use(express.json({extended: false}))// this should allow req.body to get data


app.set('view engine','ejs');
app.use(express.urlencoded({extended:false})); // this line tells express that we use input from form and pass it to above route /api/transaction
//including endpoint
app.get('/', (req,res) => {
    res.render('index');
});
//get runs at / and it has callback and if the request is accepted it sends API Running


//Define routes
app.use('/api/users' , require('./routes/api/users'));
app.use('/api/customers' , require('./routes/api/customers'));
app.use('/api/transaction' , require('./routes/api/transaction'));
app.use('/api/history' , require('./routes/api/history'));




const PORT = process.env.PORT || 5000; 
// process.env.PORT it looks for environment variable in heroku if not runs in 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
//listen returns a callback if connected so we are printing server is running