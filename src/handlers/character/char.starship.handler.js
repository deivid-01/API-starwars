const Character = require('../../models/character');

const charStarshipHdlr = {}


//....................

//--------------------------------------------------------
charStarshipHdlr.updateStarship= async(prevPilots_id,newPilots_id,starship_id)=>{
   
    if( newPilots_id!=null)
    {
        if(prevPilots_id!= null )
        {
            //Delete home character
            await  charStarshipHdlr.deleteStarshipFromMany(prevPilots_id,starship_id);              
        }
            //Add home character        
        await charStarshipHdlr.addStarshipToMany(newPilots_id,starship_id);   
    } 
}

charStarshipHdlr.addStarshipToOne = async(pilot_id,starship_id)=>
{
    try
    {
        var character = await  Character.findById(pilot_id);
        if(!character.starships.includes(starship_id))
        {
            character.vehicles.push(starship_id);
            await character.save();
        }
    }
    catch(err)
    {
        console.log(err);
    }
}
charStarshipHdlr.addStarshipToMany = async(pilots_id,starship_id)=>
{
    if(pilots_id!=null && pilots_id.length>0)
    {
         await Promise.all(pilots_id.map(async(pilot_id)=>{
             await charStarshipHdlr.addStarshipToOne(pilot_id,starship_id);  
         }))
    }
}
charStarshipHdlr.deleteStarshipFromMany = async(pilots_id,starship_id)=>
{
      if(pilots_id!=null && pilots_id.length>0)
    {
         await Promise.all(pilots_id.map(async(pilot_id)=>{
             await charStarshipHdlr.deleteStarshipFromOne(pilot_id,starship_id);  
         }))
    }
}
charStarshipHdlr.deleteStarshipFromOne = async(pilot_id,starship_id)=>
{
    if( pilot_id!=null )
    {
        var character = await Character.findById(pilot_id);
        character.starships= character.starships.filter((starship)=>String(starship).localeCompare(starship_id)!=0)
        await character.save();
    }
}
charStarshipHdlr.deleteAllStarships = async()=>
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

module.exports = charStarshipHdlr;