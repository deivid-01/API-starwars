const Vehicle = require('../models/vehicle');

const vehicleCtrl = {}
//Post
vehicleCtrl.createOne = async(req,res) => {

    var vehicle=  new Vehicle(req.body);
    
    await vehicle.save();
    res.json({
        'status':'Vehicle saved'
    })
}
//Get
vehicleCtrl.getOne = async(req,res) =>{
    
    var vehicle = await Vehicle.findById(req.params.id);
    res.json(vehicle);
}


vehicleCtrl.getAll = async(req,res) =>{
    
    var vehicles = await Vehicle.find();
    res.json(vehicles);
}
//Put
vehicleCtrl.updateOne = async(req,res) =>{
    await Vehicle.findByIdAndUpdate(req.params.id,req.body);
    res.status(201).json({msg:' Vehicle uploaded'});
}
//Delete
vehicleCtrl.deleteOne = async( req,res) => {
    await Vehicle.findByIdAndDelete(req.params.id);
    res.json({"msg":"Vehicle deleted"});

}

vehicleCtrl.deleteMany = async(req,res)=>{
    await Vehicle.deleteMany({});
    res.json({"msg":"All Vehicles has been deleted"});

}

module.exports = vehicleCtrl;
