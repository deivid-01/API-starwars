const mongoose = require('mongoose');
require('dotenv').config({path:'variables.env'});
const URI = process.env.DB_URL;

//Set database
mongoose.connect( URI, { useNewUrlParser: true , useUnifiedTopology:true, useFindAndModify:false} )
    .then(db => console.log("Database Connected"))
    .catch( err => console.error(err));

module.exports = mongoose ; 