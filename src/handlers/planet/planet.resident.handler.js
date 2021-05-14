const Planet = require('../../models/planet');
const planetHandler = {};

planetHandler.updateResident = async(prevPlanet_id,newPlanet_id,resident_id)=>{

    if( newPlanet_id != null)
    {
        if (prevPlanet_id != null)
        {
            await planetHandler.deleteResident(prevPlanet_id,resident_id);               
        }
    
        await planetHandler.addResident(newPlanet_id,resident_id); 
    }   
}
planetHandler.addResident = async(planet_id,resident_id)=>{
    //Saving Character in planet
    if (planet_id != null)
    {
        var planet = await Planet.findById(planet_id);
        if(!planet.residents.includes(resident_id))
        {
            planet.residents.push(resident_id);
            await planet.save();
        }
    }
    
}

planetHandler.deleteResident = async(planet_id,resident_id)=>
{
    if(planet_id !=null)
    {
        var planet =  await Planet.findById(planet_id);
        planet.residents= planet.residents.filter((resident)=>String(resident).localeCompare(resident_id)!=0)
        await planet.save();
    }
   
}
planetHandler.deleteResidentFromMany = async(planet_id,residents_id,)=>
{
    if(residents_id!=null && residents_id.length>0)
    {
         await Promise.all(residents_id.map(async(resident_id)=>{
             await charHomeworldHdlr.deleteHomeworldFromOne(planet_id,resident_id);  
         }))
    }
   
}
planetHandler.deleteAllResidents = async()=>{
    var planets = await Planet.find();
    planets.forEach(planet => {
        planet.residents = []
        planet.save();       
    });
}

module.exports=planetHandler;