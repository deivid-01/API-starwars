const Vehicle = require('../models/vehicle');
const charVehicleHandler = require('../handlers/character/char.vehicle.handler');
const vehicleCtrl = {}
//Post
vehicleCtrl.createOne = async(req,res) => {

    try
    {
        var vehicle = new Vehicle(req.body);

        await vehicle.save(async(err)=>{
            if( err) return  res.status(400).json({"msg":err.message});  
            
            await charVehicleHandler.addVehicleToMany(vehicle.pilots,vehicle._id,);
            
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
        await Vehicle.findById(req.params.id).
        populate('pilots','name').
        exec(function(err,vehicle){
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
        await Vehicle.find().
        populate('pilots','name').
        exec(function(err,vehicles){
                return res.status(200).json(vehicles);
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

       await  charVehicleHandler.updateVehicle(vehicle.pilots,req.body.pilots,vehicle._id);

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

        await charVehicleHandler.deleteVehicleFromMany(vehicle.pilots,vehicle._id);

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
      await charVehicleHandler.deleteAllVehicles();
      await Vehicle.deleteMany({});
      return res.status(200).json({"msg":"All Vehicles has been deleted"});
  }
  catch(err)
  {
      return res.status(400).json({"msg":err.message});
  }

}


module.exports = vehicleCtrl;
