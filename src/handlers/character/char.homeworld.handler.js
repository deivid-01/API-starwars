const Character = require('../../models/character');
const planetResidentHandler = require('../planet/planet.resident.handler');
const charHomeworldHdlr = {}

charHomeworldHdlr.updateHomeworld= async(prevResidents_id,newResidents_id,planet_id)=>{
   
    if( newResidents_id!=null && newResidents_id.length > 0)
    {
        if(prevResidents_id!= null && prevResidents_id.length>0)
        {
            //Delete  character in other planets
            await planetResidentHandler.deleteResidentFromMany(planet_id,prevResidents_id);              
        }
            //Add home character     
             
        await charHomeworldHdlr.findAndDeleteHomeworldOfMany(newResidents_id);   
        await charHomeworldHdlr.addHomeworldToMany(newResidents_id,planet_id);   
    } 
}
charHomeworldHdlr.addHomeworldToOne = async(resident_id,planet_id)=>{
    var character = await Character.findById(resident_id);
    if ( character!=null)
    {
        character.homeworld = planet_id;
        await character.save();
    }

}
charHomeworldHdlr.addHomeworldToMany = async (residents,planet_id) =>
{
    if(residents!=null && residents.length>0)
    {
         await Promise.all(residents.map(async(resident)=>{
             await charHomeworldHdlr.addHomeworldToOne(resident,planet_id);  
         }))
    }
}

charHomeworldHdlr.deleteHomeworldFromOne = async(character_id)=>
{
    if (character_id !=null)
    {
        var character = await Character.findById(character_id);
        character.homeworld = null;
        await character.save();
    }
}
charHomeworldHdlr.deleteHomeworldFromMany = async(characters_id)=>
{
    if(characters_id!=null && characters_id.length>0)
    {
         await Promise.all(characters_id.map(async(character_id)=>{
             await charHomeworldHdlr.deleteHomeworldFromOne(character_id);  
         }))
    }
}
charHomeworldHdlr.deleteAllHomeworlds = async()=>
{
    var characters = await Character.find();
    characters.forEach(async (character)=>
    {
        if ( character.homeworld != null)
        {
            character.homeworld = null;
            await character.save();
        };
    })
}

charHomeworldHdlr.findAndDeleteHomeworldOfMany = async(residents_id)=>{
   

    await Promise.all(residents_id.map(async(resident_id)=>{
        var character = await Character.findById(resident_id);
        var previousPlanet = character.homeworld;
        if (previousPlanet!=null)
        {
            await planetResidentHandler.deleteResident(previousPlanet,character._id);

        }
    }));
}

module.exports = charHomeworldHdlr;