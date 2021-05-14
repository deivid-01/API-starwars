const Starship = require('../models/starship');
const character_planetCtrl = require('./character-planet.controller');

const starshipCtrl = {}
//Post
starshipCtrl.createOne = async(req,res) => {

    try
    {
        var starship = new Starship(req.body);

        await starship.save(async(err)=>{
            if( err) return  res.status(400).json({"msg":err.message});  

            if (starship.pilots!=null)
            {
                await character_planetCtrl.addStarship(starship._id,starship.pilots);
            }
            return  res.status(200).json({'msg':'Starship saved','id':starship._id })    
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }  
}
//Get
starshipCtrl.getOne = async(req,res) =>{
    try
    {
        await Starship.findById(req.params.id).populate('pilots','name').exec(function(err,starship){
            if (err)  return res.status(400).json({"msg":"Starship not found"})
            return res.status(200).json(starship)       
        });    
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }
    

}

starshipCtrl.getAll = async(req,res) =>{

    try
    {
        await Starship.find((err,starships)=>{
            Starship.populate(starships,{path:"pilots",select:"name"},function(err,starships){
                return res.status(200).json(starships);
            });
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }
   
}
//Put
starshipCtrl.updateOne = async(req,res) =>{

    req.body.edited=Date(Date.now);
    try
    {
        var starship = await Starship.findById(req.params.id);

        if( req.body.pilots!=null )
        {
            if(req.body.pilots.length > 0)
            {
                if(starship.pilots != null)
                {
                    //Delete home character
                    await  character_planetCtrl.deleteStarship(starship._id,starship.pilots);              
                }
                    //Add home character        
                await character_planetCtrl.addStarship(starship._id,req.body.pilots,res);   
          
            }
           
            
        }

        await Starship.findByIdAndUpdate(req.params.id,req.body);
        res.status(201).json({msg:' Starship uploaded'});
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }

}
//Delete
starshipCtrl.deleteOne = async( req,res) => {
    try
    {
        //deleteHomweworldOfResidents
        var starship = await  Starship.findById(req.params.id);
        if ( starship.pilots!=null)
        {
            await character_planetCtrl.deleteStarship(starship._id,starship.pilots);
        }

        await Starship.findByIdAndDelete(req.params.id);
        return res.status(200).json({"msg":"Starship deleted"});
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }

}

starshipCtrl.deleteAll = async(req,res)=>{
    try{        
      await character_planetCtrl.deleteAllStarships();
      await Starship.deleteMany({});
      return res.status(200).json({"msg":"All Starships has been deleted"});
  }
  catch(err)
  {
      return res.status(400).json({"msg":err.message});
  }

}


module.exports = starshipCtrl;
