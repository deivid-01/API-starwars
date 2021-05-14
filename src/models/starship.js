  
const moongose = require("mongoose");
const {Schema} = moongose;

const StarshipSchema = new Schema({

    name : { type:String, required:true},
    model : { type:String, default:""},
    manufacturer : { type:String, default:""},
    cost_in_credits : { type:String, default:""},
    length : { type:String, default:""},
    max_atmosphering_speed : { type:String, default:""},
    crew : { type:String, default:""},
    passengers : { type:String, default:""},
    cargo_capacity : {type:String, default:""},
    consumables : {type:String, default:""},
    hyperdrive_rating : {type:String, default:""},
    MGLT : {type:String, default:""},
    starship_class : {type:String, default:""},
    pilots : [ {type: Schema.Types.ObjectId, ref :'Character'} ],
    created : {type:String, default:Date(Date.now)}, 
    edited : {type:String, default:Date(Date.now)},
    url : {type:String} //Assign own url

});

module.exports = moongose.model('Starship',StarshipSchema);