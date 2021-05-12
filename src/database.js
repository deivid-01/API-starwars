const mongoose = require('mongoose');

const URI = 'mongodb://localhost/starwars';

mongoose.connect( URI, { useNewUrlParser: true , useUnifiedTopology:true, useFindAndModify:false} )
    .then(db => console.log("DB is connected"))
    .catch( err => console.error(err));

module.exports = mongoose ; 