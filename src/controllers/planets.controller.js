const Planet = require('../models/planet');
const character_planetCtrl = require('./character-planet.controller');

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
                await character_planetCtrl.addHomeworld(planet._id,planet.residents);
            }
            return  res.status(200).json({'msg':'Planet saved','id':planet._id })    
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
                //Delete home character
                await  character_planetCtrl.deleteHomeworld(planet.residents);              
            }
                //Add home character        
            await character_planetCtrl.addHomeworld(planet._id,req.body.residents,res);   
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
    try
    {
        //deleteHomweworldOfResidents
        var planet = await  Planet.findById(req.params.id);
        if ( planet.residents!=null)
        {
            await character_planetCtrl.deleteHomeworld(planet.residents);
        }

        await Planet.findByIdAndDelete(req.params.id);
        return res.status(200).json({"msg":"Planet deleted"});
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }

}

planetCtrl.deleteAll = async(req,res)=>{
    try{
        //Delete homeworld from Planets
        
      await character_planetCtrl.deleteAllHomeworlds();
      await Planet.deleteMany({});
      return res.status(200).json({"msg":"All Planets has been deleted"});
  }
  catch(err)
  {
      return res.status(400).json({"msg":err.message});
  }

}


module.exports = planetCtrl;
