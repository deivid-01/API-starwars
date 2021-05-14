const Character = require('../../models/character');

const charVehicleHdlr = {}

charVehicleHdlr.updateVehicle= async(prevPilots_id,newPilots_id,vehicle_id)=>{
   
    if( newPilots_id!=null && newPilots_id.length > 0 )
    {
        if(prevPilots_id!= null  && prevPilots_id.length > 0)
        {
            //Delete home character
            await  charVehicleHdlr.deleteVehicleFromMany(prevPilots_id,vehicle_id);              
        }
            //Add home character        
        await charVehicleHdlr.addVehicleToMany(newPilots_id,vehicle_id);   
    } 
}
charVehicleHdlr.addVehicleToOne = async(pilot_id,vehicle_id)=>
{
    try
    {
        var character = await  Character.findById(pilot_id);
        if(!character.vehicles.includes(vehicle_id))
        {
            character.vehicles.push(vehicle_id);
            await character.save();
        }
    }
    catch(err)
    {
        console.log(err);
    }
}
charVehicleHdlr.addVehicleToMany = async(pilots_id,vehicle_id)=>
{
    if(pilots_id!=null && pilots_id.length>0)
    {
         await Promise.all(pilots_id.map(async(pilot_id)=>{
             await charVehicleHdlr.addVehicleToOne(pilot_id,vehicle_id);  
         }))
    }
}
charVehicleHdlr.deleteVehicleFromMany = async(characters_id,vehicle_id)=>
{
      if(characters_id!=null && characters_id.length>0)
    {
         await Promise.all(characters_id.map(async(character_id)=>{
             await charVehicleHdlr.deleteVehicleFromOne(character_id,vehicle_id);  
         }))
    }
}
charVehicleHdlr.deleteVehicleFromOne = async(character_id,vehicle_id)=>
{
    if( character_id!=null )
    {
        var character = await Character.findById(character_id);
        character.vehicles= character.vehicles.filter((vehicle)=>String(vehicle).localeCompare(vehicle_id)!=0)
        await character.save();
    }
}
charVehicleHdlr.deleteAllVehicles = async()=>
{
    var characters = await Character.find();
    characters.forEach(async (character)=>
    {
        if ( character.vehicles != null)
        {
            character.vehicles = [];
            await character.save();
        };
    })
}
module.exports = charVehicleHdlr;