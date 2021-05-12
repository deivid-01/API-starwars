  
const moongose = require("mongoose");
const {Schema} = moongose;

const StarshipSchema = new Schema({

    name : { type:String},
    model : { type:String},
    manufacturer : { type:String},
    cost_in_credits : { type:String},
    length : { type:String},
    max_atmosphering_speed : { type:String},
    crew : { type:String},
    passengers : { type:String},
    cargo_capacity : {type:String},
    consumables : {type:String},
    hyperdrive_rating : {type:String},
    MGLT : {type:String},
    starship_class : {type:String},
    pilots : [ {type: Schema.Types.ObjectId, ref :'Character'} ],
    //Later
    created : { type:String}, //Must be Date type
    edited : {type:String},//Must be Date type
    url : {type:String} //Assign own url

});

module.exports = moongose.model('Starship',StarshipSchema);