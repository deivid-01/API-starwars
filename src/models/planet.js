  
const moongose = require("mongoose");
const {Schema} = moongose;

const PlanetSchema = new Schema({

    name : { type:String, required: true},
    rotation_period : { type:String, default:""},
    orbital_period : { type:String}, default:"",
    diameter : { type:String, default:""},
    climate : { type:String, default:""},
    gravity : { type:String, default:""},
    terrain : { type:String, default:""},
    surface_water : {type:String, default:""},
    population : {type:String, default:""},
    residents : [ {type: Schema.Types.ObjectId, ref :'Character'} ],
    created : {type:String, default:Date(Date.now)}, 
    edited : {type:String, default:Date(Date.now)},
    url : {type:String} //Assign own url

});

module.exports = moongose.model('Planet',PlanetSchema);