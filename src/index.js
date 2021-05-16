const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
    
const swaggerUI = require('swagger-ui-express');
const swaggerDocoment = require('./swagger.json')
const { mongoose } = require('./database');



require('dotenv').config({path:'variables.env'});

const app = express();
app.set('host',process.env.HOST || '0.0.0.0');
app.set('port',process.env.PORT || 5000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

//Routes
app.use('/api/characters',require('./routes/characters.routes'));
app.use('/api/planets',require('./routes/planets.routes'));
app.use('/api/starships',require('./routes/starships.routes'));
app.use('/api/vehicles',require('./routes/vehicles.routes'));
app.use('/api/restore',require('./routes/restore.routes'));
app.use('/api/docs',swaggerUI.serve,swaggerUI.setup(swaggerDocoment)); //Redirect to docs
app.get('/',(req,res) =>{ res.redirect('/api/docs');});
    
//Start server
app.listen(app.get('port'),app.get('host'),()=>{
    console.log('Server on port',app.get('port'));  
});

