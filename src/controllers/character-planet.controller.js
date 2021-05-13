const Character = require('../models/character');
const Planet = require('../models/planet');

character_planetCtrl = {}

//Character handlers
character_planetCtrl.addHomeworld = async (planet_id,residents,res) =>
{
        residents.forEach(async(resident_id)=>{
            try{
                var character = await Character.findById(resident_id);
    
                if ( character!=null)
                {
                    var prevPlanet_id = character.homeworld;
                    character.homeworld = planet_id;
                    await character.save();
        
                    if (prevPlanet_id!=null)
                    {
                        //Delete character from other planets
                        await character_planetCtrl.deleteResident(prevPlanet_id,character._id);
                    }
                }
            }
            catch(err)
            {
                return 
            }
        })

  

}
character_planetCtrl.deleteAllHomeworlds = async()=>
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
character_planetCtrl.deleteHomeworld = async(characters_id)=>
{
    characters_id.forEach(async (character_id)=>
    {
        var character = await Character.findById(character_id);
        character.homeworld = null;
        await character.save();
    })
}
//-----------------------------------------------------------------------------
//Planet Handlers
character_planetCtrl.addResident = async(planet_id,resident_id)=>{
    //Saving Character in planet
    var planet = await Planet.findById(planet_id);
    if(!planet.residents.includes(resident_id))
    {
        planet.residents.push(resident_id);
        await planet.save();
    }
}

character_planetCtrl.deleteResident = async(planet_id,resident_id)=>
{
    var planet =  await Planet.findById(planet_id);
    planet.residents= planet.residents.filter((resident)=>String(resident._id).localeCompare(resident_id)!=0)
    await planet.save();
}

character_planetCtrl.deleteAllResidents = async()=>{
    var planets = await Planet.find();
    planets.forEach(planet => {
        planet.residents = []
        planet.save();       
    });
}





module.exports = character_planetCtrl;