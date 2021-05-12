  
const moongose = require("mongoose");
const {Schema} = moongose;

const PlanetSchema = new Schema({

    name : { type:String},
    rotation_period : { type:String},
    orbital_period : { type:String},
    diameter : { type:String},
    climate : { type:String},
    gravity : { type:String},
    terrain : { type:String},
    surface_water : {type:String},
    population : {type:String},
    residents : [ {type: Schema.Types.ObjectId, ref :'Character'} ],
    //Later
    created : { type:String}, //Must be Date type
    edited : {type:String},//Must be Date type
    url : {type:String} //Assign own url

});

module.exports = moongose.model('Planet',PlanetSchema);