  
const moongose = require("mongoose");
const {Schema} = moongose;

const CharacterSchema = new Schema({

    name : { type:String},
    height : { type:String},
    mass : { type:String},
    hair_color : { type:String},
    skin_color : { type:String},
    eye_color : { type:String},
    birth_year : { type:String},
    gender : { type:String},
    homeworld : {type: Schema.Types.ObjectId, ref :'Planet'},
    vehicles : [ {type: Schema.Types.ObjectId, ref :'Vehicle'} ],
    starships : [ {type: Schema.Types.ObjectId, ref :'Starship'} ],
    created : { type:String}, //Must be Date type
    edited : {type:String},//Must be Date type
    url : {type:String} //Assign own url
});

module.exports = moongose.model('Character',CharacterSchema);