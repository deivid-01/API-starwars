const Planet = require('../models/planet');
const Character = require('../models/character');

const planetCtrl = {}
//Post
planetCtrl.createOne = async(req,res) => {

    try
    {
        var planet = new Planet(req.body);

        await planet.save(async(err)=>{
            if( err) return  res.status(400).json({"msg":err.message});  


            if (planet.residents!=null)
            {
                await characterCtrl.addHomeWorld(planet._id,planet.residents);
            }
            return  res.status(200).json({'msg':'Planet saved' })    
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }  
}
//Get
planetCtrl.getOne = async(req,res) =>{
    try
    {
        await Planet.findById(req.params.id).populate('residents','name').exec(function(err,planet){
            if (err)  return res.status(400).json({"msg":"Planet not found"})
            return res.status(200).json(planet)       
        });    
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }
    

}

planetCtrl.getAll = async(req,res) =>{

    try
    {
        await Planet.find((err,planets)=>{
            Planet.populate(planets,{path:"residents",select:"name"},function(err,planets){
                return res.status(200).json(planets);
            });
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }
   
}
//Put
planetCtrl.updateOne = async(req,res) =>{

    req.body.edited=Date(Date.now);
    try
    {
        var planet = await Planet.findById(req.params.id);

        if( req.body.residents!=null)
        {
            if(planet.residents != null)
            {
                //Delete home
                planet.residents.forEach(async (resident_id)=>
                {
                    var character = await Character.findById(resident_id);
                    character.homeworld = null;
                    character.save();
                })
            }
            //Add Planet to residents

        }


        await Planet.findByIdAndUpdate(req.params.id,req.body);
        res.status(201).json({msg:' Planet uploaded'});
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }

}
//Delete
planetCtrl.deleteOne = async( req,res) => {
    await Planet.findByIdAndDelete(req.params.id);
    res.json({"msg":"Planet deleted"});

}

planetCtrl.deleteMany = async(req,res)=>{
    await Planet.deleteMany({});
    res.json({"msg":"All Planets has been deleted"});

}

planetCtrl.deleteAllResidents = async()=>{
    var planets = await Planet.find();
    planets.forEach(planet => {
        planet.residents = []
        planet.save();       
    });
}

planetCtrl.addResident = async(planet_id,resident_id)=>{
    //Saving Character in planet
    var planet = await Planet.findById(planet_id);
    if(!planet.residents.includes(resident_id))
    {
        planet.residents.push(resident_id);
        await planet.save();
    }
}

planetCtrl.deleteResident = async(planet_id,resident_id)=>
{
    var planet =  await Planet.findById(planet_id);
    planet.residents= planet.residents.filter((resident)=>String(resident._id).localeCompare(resident_id)!=0)
    await planet.save();
}

module.exports = planetCtrl;
