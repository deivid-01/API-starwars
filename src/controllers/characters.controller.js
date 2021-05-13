const Character = require('../models/character');
const planetCtrl = require('./planets.controller');

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
                planetCtrl.addResident(character.homeworld,character._id);
            }
    
            return  res.status(200).json({'msg':'Character saved' })    
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
        await Character.findById(req.params.id).populate('homeworld','name').exec(function(err,character){
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
        await Character.find((err,findedData)=>{
            Character.populate(findedData,{path:"homeworld",select:"name"},function(err,characters){
                return res.status(200).json(characters);
            });
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
        var newPlanet = req.body.homeworld;
        var previousPlanet=(await Character.findById(req.params.id)).homeworld;

        if( newPlanet!=null)
        {
            if (previousPlanet != null)
            {
                await planetCtrl.deleteResident(previousPlanet,req.params.id);               
            }

            await planetCtrl.addResident(newPlanet,req.params.id);             
        }
        
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
            await planetCtrl.deleteResident(planet_id,character_id);
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
        await planetCtrl.deleteAllResidents();
        await Character.deleteMany({});
        return res.status(200).json({"msg":"All Characters has been deleted"});
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }
}

characterCtrl.addHomeworld = async(planet_id,residents)=>{
    //Adding planet to residents
    residents.forEach(async(resident_id)=>{
        var character = await Character.findById(resident_id);

        if ( character!=null)
        {
            var prevPlanet_id = character.homeworld;
            character.homeworld = planet_id;
            await character.save();

            if (prevPlanet_id!=null)
            {
                //Delete character from other planets
                await planetCtrl.deleteResident(prevPlanet_id,character._id);
            }
        }

    })
}


module.exports = characterCtrl;
