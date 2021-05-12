const express = require('express');
const morgan = require('morgan');

const app = express();
const { mongoose } = require('./database');

app.set('port',process.env.PORT || 5000);

app.use(morgan('dev'));
app.use(express.json());


app.use('/api/characters',require('./routes/characters.routes'));
app.use('/api/planets',require('./routes/planets.routes'));
app.use('/api/starships',require('./routes/starships.routes'));
app.use('/api/vehicles',require('./routes/vehicles.routes'));

app.listen(app.get('port'),()=>{
    console.log('Server on port',app.get('port'));


});