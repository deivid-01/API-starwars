const Character = require('../models/character');
const character_planetCtrl = require('./character-planet.controller');


const characterCtrl = {}
//Post
characterCtrl.createOne = async(req,res) => {

    try
    {
        var character=  new Character(req.body);
    
        await character.save( async(err)=>{
    
            if( err) return  res.status(400).json({"msg":err.message});  
    
            if(character.homeworld!= null)
            {
                character_planetCtrl.addResident(character.homeworld,character._id);
            }
    
            return  res.status(200).json({'msg':'Character saved','id':character._id })    
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }    
}
//Get
characterCtrl.getOne = async(req,res) =>{
    try
    {
        await Character.findById(req.params.id).
        populate('homeworld','name').
        populate('vehicles','name').
        populate('starships','name').
        exec(function(err,character){
            if (err)  return res.status(400).json({"msg":"Character not found"})
            return res.status(200).json(character)       
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }
}


characterCtrl.getAll = async(req,res) =>{

    try
    {
        await Character.find(req.params.id).
        populate('homeworld','name').
        populate('vehicles','name').
        populate('starships','name').
        exec(function(err,characters){
            if (err)  return res.status(400).json({"msg":"Characters not found"})
            return res.status(200).json(characters)       
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }

}
//Put
characterCtrl.updateOne = async(req,res) =>{
    req.body.edited=Date(Date.now);
    try
    {   
        var character         = await Character.findById(req.params.id);
        
        //New data          
        var newPlanet         = req.body.homeworld;
        var newVehicles       = req.body.vehicles;
        var newStarships      = req.body.starships;

        //Previous data
        var previousPlanet    = character.homeworld;
        var previousVehicles  = character.vehicles;
        var previousStarships = character.starships;

 
        //Update data
        await character_planetCtrl.updateResident(previousPlanet,newPlanet,character._id);   
        await character_planetCtrl.updatePilot(previousVehicles,newVehicles,character._id);   
        await character_planetCtrl.updatePilotStarship(previousStarships,newStarships,character._id);   
    
        await Character.findByIdAndUpdate(req.params.id,req.body);
        
        return res.status(200).json({"msg":"Character updated"});

    }
           
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }



}
//Delete
characterCtrl.deleteOne = async( req,res) => {

    try
    {
        var planet_id = (await  Character.findById(req.params.id)).homeworld;
        var character_id = req.params.id;

        if ( planet_id!=null)
        {
            await character_planetCtrl.deleteResident(planet_id,character_id);
        }

        await Character.findByIdAndDelete(character_id);
        return res.status(200).json({"msg":"Character deleted"});
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }
}

characterCtrl.deleteAll = async(req,res)=>{

  
    try{
          //Delete characters from Planets
        await character_planetCtrl.deleteAllResidents();
        await Character.deleteMany({});
        return res.status(200).json({"msg":"All Characters has been deleted"});
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }
}

module.exports = characterCtrl;
