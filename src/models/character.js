  
const moongose = require("mongoose");
const {Schema} = moongose;

const CharacterSchema = new Schema({

    name : { type:String, required: true},
    height : { type:String,default:""},
    mass : { type:String, default:""},
    hair_color : { type:String, default:""},
    skin_color : { type:String, default:""},
    eye_color : { type:String, default:""},
    birth_year : { type:String, default:""},
    gender : { type:String, default:""},
    homeworld : {type: Schema.Types.ObjectId, ref :'Planet'},
    vehicles : [ {type: Schema.Types.ObjectId, ref :'Vehicle'} ],
    starships : [ {type: Schema.Types.ObjectId, ref :'Starship'} ],
    created : {type:Date, default:Date.now}, 
    edited : {type:Date, default:Date.now},
    url : {type:String} //Assign own url
});

module.exports = moongose.model('Character',CharacterSchema);