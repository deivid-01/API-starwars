const Starship = require('../models/starship');
const charStarshipHandler = require('../handlers/character/char.starship.handler');
const starshipCtrl = {}
//Post
starshipCtrl.createOne = async(req,res) => {

    try
    {
        var starship = new Starship(req.body);

        await starship.save(async(err)=>{
            if( err) return  res.status(400).json({"msg":err.message});  
            
            await charStarshipHandler.addStarshipToMany(starship.pilots,starship._id);

            return  res.status(200).json({'msg':'Starship saved','id':starship._id })    
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }  
}
starshipCtrl.createManyFromSWAPI = async(starshipsData) => {

    await Promise.all(starshipsData.map(async(starshipData)=>{
        delete starshipData.pilots;
        delete starshipData.films;
        delete starshipData.created;
        delete starshipData.edited;
        try
        {
            var starship = new Starship(starshipData);

            await starship.save(async(err)=>{
                if( err) return  console.log(err);
                
                await charStarshipHandler.addStarshipToMany(starship.pilots,starship._id);
    
            });
        }
        catch(err)
        {
           console.log(err);
    
        }  
        
    }));

}
//Get
starshipCtrl.getOne = async(req,res) =>{
    try
    {
        await Starship.findById(req.params.id).
        populate('pilots','name').
        exec(function(err,starship){
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
        await Starship.find().
        populate('pilots','name').
        exec(function(err,starships){
                return res.status(200).json(starships);
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

        await charStarshipHandler.updateStarship(starship.pilots,req.body.pilots,starship._id);

        await Starship.findByIdAndUpdate(req.params.id,req.body);
      
            return res.status(201).json({msg:' Starship uploaded'});
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
        
        await charStarshipHandler.deleteStarshipFromMany(starship.pilots,starship._id);


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
      await charStarshipHandler.deleteAllStarships();
      await Starship.deleteMany({});
      
      if(res!=null)
        return res.status(200).json({"msg":"All Starships has been deleted"});
  }
  catch(err)
  {
    if(res!=null)
      return res.status(400).json({"msg":err.message});
  }

}


module.exports = starshipCtrl;
