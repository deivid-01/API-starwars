const Starship = require('../../models/starship');
const starshipHandler = {};

//Starship Handlers
starshipHandler.updatePilot= async(prevStarships_id,newStarships_id,pilot_id)=>{
   
    if(newStarships_id!=null && newStarships_id.length>0)
    {
        if (prevStarships_id!=null && prevStarships_id.length > 0)
        {
            await starshipHandler.deletePilotFromMany(prevStarships_id,pilot_id);
                        
        }

        await starshipHandler.addPilotToMany(newStarships_id,pilot_id);

    }

}
starshipHandler.addPilotToOne = async(starship_id,pilot_id)=>{
    //Saving Character in planet
    var starship = await Starship.findById(starship_id);
 
    if(!starship.pilots.includes(pilot_id))
    {
        starship.pilots.push(pilot_id);
        await starship.save();
    }
}

starshipHandler.addPilotToMany = async(starships_id,pilot_id)=>{
    //Saving Character in planet
    if(starships_id !=null && starships_id.length > 0)
    {
        await Promise.all(starships_id.map(async(starship_id)=>{
            await starshipHandler.addPilotToOne(starship_id,pilot_id); 
         
        }));
    }

}

starshipHandler.deletePilotFromOne= async(starship_id,pilot_id)=>
{
    var starship =  await Starship.findById(starship_id);
    starship.pilots= starship.pilots.filter((pilot)=>String(pilot).localeCompare(pilot_id)!=0)
    await starship.save();
}

starshipHandler.deletePilotFromMany = async(starships_id,pilot_id)=>
{
   if(starships_id !=null && starships_id.length>0)
   {
    await Promise.all(starships_id.map(async(starship_id)=>{
        await starshipHandler.deletePilotFromOne(starship_id,pilot_id); 
     
    }));
   }
    
}


starshipHandler.deleteAllPilots = async()=>{
    var starships= await Starship.find();
    starships.forEach(starship => {
        starship.pilots = []
        starship.save();       
    });
}

starshipHandler.findStarshipsByURL = async(starships_URL)=>{
    
    var starships_ids = []
    await Promise.all(starships_URL.map(async(starship_URL)=>{
        
        try
        {
            var starship = await Starship.findOne({url:starship_URL});
            starships_ids.push(starship._id);
        }
        catch(err)
        {
            
        }
       
    }))

    return starships_ids;
}



module.exports = starshipHandler;