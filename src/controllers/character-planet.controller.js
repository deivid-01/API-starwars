;const Character = require('../models/character');
const Planet = require('../models/planet');
const Vehicle = require('../models/vehicle');
const Starship = require('../models/starship');

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
character_planetCtrl.addVehicle = async(vehicle_id,characters_id,res)=>
{
    characters_id.forEach(async(character_id)=>{
        try
        {
            var character = await  Character.findById(character_id);
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
        
    })
}
character_planetCtrl.addStarship = async(starship_id,characters_id,res)=>
{
    characters_id.forEach(async(character_id)=>{
        try
        {
            var character = await  Character.findById(character_id);
            if(!character.starships.includes(starship_id))
            {
                character.starships.push(starship_id);
                await character.save();
            }
        }
        catch(err)
        {
            console.log(err);
        }
        
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

character_planetCtrl.deleteVehicle = async(vehicle_id,characters_id)=>
{
    characters_id.forEach(async (character_id)=>
    {
        var character = await Character.findById(character_id);
        character.vehicles= character.vehicles.filter((vehicle)=>String(vehicle).localeCompare(vehicle_id)!=0)
        await character.save();
    })
}
character_planetCtrl.deleteStarship = async(starship_id,characters_id)=>
{
    characters_id.forEach(async (character_id)=>
    {
        var character = await Character.findById(character_id);
        character.starships= character.starships.filter((starship)=>String(starship).localeCompare(starship_id)!=0)
        await character.save();
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
character_planetCtrl.deleteAllVehicles = async()=>
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
character_planetCtrl.deleteAllStarships = async()=>
{
    var characters = await Character.find();
    characters.forEach(async (character)=>
    {
        if ( character.starships != null)
        {
            character.starships = [];
            await character.save();
        };
    })
}

//-----------------------------------------------------------------------------
//Planet Handlers
character_planetCtrl.updateResident = async(prevPlanet_id,newPlanet_id,resident_id)=>{

    if( newPlanet_id != null)
    {
        if (prevPlanet_id != null)
        {
            await character_planetCtrl.deleteResident(prevPlanet_id,resident_id);               
        }
    
        await character_planetCtrl.addResident(newPlanet_id,resident_id); 
    }   
}
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
    planet.residents= planet.residents.filter((resident)=>String(resident).localeCompare(resident_id)!=0)
    await planet.save();
}

character_planetCtrl.deleteAllResidents = async()=>{
    var planets = await Planet.find();
    planets.forEach(planet => {
        planet.residents = []
        planet.save();       
    });
}

//Vehicles Handlers
character_planetCtrl.updatePilot = async(prevVehicles_id,newVehicles_id,pilot_id)=>{
   
    if(newVehicles_id!=null && newVehicles_id.length > 0) 
    {
        if (prevVehicles_id.length > 0)
        {
            await Promise.all(prevVehicles_id.map(async(prevVehicle_id)=>{
                await character_planetCtrl.deletePilot(prevVehicle_id,pilot_id);  
            }))
                        
        }
        newVehicles_id.forEach( async(newVehicle_id)=>{
            await character_planetCtrl.addPilot(newVehicle_id,pilot_id); 
        })
    }   
}
character_planetCtrl.addPilot = async(vehicle_id,pilot_id)=>{
    //Saving Character in planet
    var vehicle = await Vehicle.findById(vehicle_id);
    if(!vehicle.pilots.includes(pilot_id))
    {
        vehicle.pilots.push(pilot_id);
        await vehicle.save();
    }
}

character_planetCtrl.deletePilot = async(vehicle_id,pilot_id)=>
{
    var vehicle =  await Vehicle.findById(vehicle_id);
    vehicle.pilots= vehicle.pilots.filter((pilot)=>String(pilot).localeCompare(pilot_id)!=0)
    await vehicle.save();
}

character_planetCtrl.deleteAllPilots = async()=>{
    var vehicles = await Vehicle.find();
    vehicles.forEach(vehicle => {
        vehicle.pilots = []
        vehicle.save();       
    });
}


//Starship Handlers
character_planetCtrl.updatePilotStarship = async(prevStarships_id,newStarships_id,pilot_id)=>{
   
    if(newStarships_id!=null)
    {
        if (prevStarships_id.length > 0)
        {
             await Promise.all(prevStarships_id.map(async(prevStarship_id)=>{
                await character_planetCtrl.deletePilotsStarship(prevStarship_id); 
             
            }));
                        
        }

        newStarships_id.forEach( async(newStarship_id)=>{
            await character_planetCtrl.addPilotStarship(newStarship_id,pilot_id); 
        })
    }

}
character_planetCtrl.addPilotStarship = async(starship_id,pilot_id)=>{
    //Saving Character in planet
    var starship = await Starship.findById(starship_id);
 
    if(!starship.pilots.includes(pilot_id))
    {
        starship.pilots.push(pilot_id);
        await starship.save();
    }
}

character_planetCtrl.deletePilotsStarship = async(starship_id)=>
{
    var starship =  await Starship.findById(starship_id);
    starship.pilots = [];
    await starship.save();
}

character_planetCtrl.deleteAllPilotStarship = async()=>{
    var starships= await Starship.find();
    starships.forEach(starship => {
        starship.pilots = []
        starship.save();       
    });
}

module.exports = character_planetCtrl;



