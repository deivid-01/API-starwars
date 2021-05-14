const Vehicle = require('../models/vehicle');
const character_planetCtrl = require('./character-planet.controller');

const vehicleCtrl = {}
//Post
vehicleCtrl.createOne = async(req,res) => {

    try
    {
        var vehicle = new Vehicle(req.body);

        await vehicle.save(async(err)=>{
            if( err) return  res.status(400).json({"msg":err.message});  

            if (vehicle.pilots!=null)
            {
                await character_planetCtrl.addVehicle(vehicle._id,vehicle.pilots);
            }
            return  res.status(200).json({'msg':'Vehicle saved','id':vehicle._id })    
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }  
}
//Get
vehicleCtrl.getOne = async(req,res) =>{
    try
    {
        await Vehicle.findById(req.params.id).populate('pilots','name').exec(function(err,vehicle){
            if (err)  return res.status(400).json({"msg":"Vehicle not found"})
            return res.status(200).json(vehicle)       
        });    
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }
    

}

vehicleCtrl.getAll = async(req,res) =>{

    try
    {
        await Vehicle.find((err,vehicles)=>{
            Vehicle.populate(vehicles,{path:"pilots",select:"name"},function(err,vehicles){
                return res.status(200).json(vehicles);
            });
        });
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }
   
}
//Put
vehicleCtrl.updateOne = async(req,res) =>{

    req.body.edited=Date(Date.now);
    try
    {
        var vehicle = await Vehicle.findById(req.params.id);

        if( req.body.pilots!=null)
        {
            if(vehicle.pilots != null)
            {
                //Delete home character
                await  character_planetCtrl.deleteVehicle(vehicle._id,vehicle.pilots);              
            }
                //Add home character        
            await character_planetCtrl.addVehicle(vehicle._id,req.body.pilots,res);   
        }

        await Vehicle.findByIdAndUpdate(req.params.id,req.body);
        res.status(201).json({msg:' Vehicle uploaded'});
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});

    }

}
//Delete
vehicleCtrl.deleteOne = async( req,res) => {
    try
    {
        //deleteHomweworldOfResidents
        var vehicle = await  Vehicle.findById(req.params.id);
        if ( vehicle.pilots!=null)
        {
            await character_planetCtrl.deleteVehicle(vehicle._id,vehicle.pilots);
        }

        await Vehicle.findByIdAndDelete(req.params.id);
        return res.status(200).json({"msg":"Vehicle deleted"});
    }
    catch(err)
    {
        return res.status(400).json({"msg":err.message});
    }

}

vehicleCtrl.deleteAll = async(req,res)=>{
    try{        
      await character_planetCtrl.deleteAllVehicles();
      await Vehicle.deleteMany({});
      return res.status(200).json({"msg":"All Vehicles has been deleted"});
  }
  catch(err)
  {
      return res.status(400).json({"msg":err.message});
  }

}


module.exports = vehicleCtrl;
