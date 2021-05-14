const Vehicle = require('../../models/vehicle');
const vehicleHandler ={}
//Vehicles Handlers
vehicleHandler.updatePilot= async(prevVehicles_id,newVehicles_id,pilot_id)=>{
   
    if(newVehicles_id!=null && newVehicles_id.length > 0) 
    {
        if (prevVehicles_id.length > 0)
        {
            await vehicleHandler.deletePilotFromMany(prevVehicles_id,pilot_id);                    
        }
        await vehicleHandler.addPilotToMany(newVehicles_id,pilot_id);
    }   
}
vehicleHandler.addPilotToOne = async(vehicle_id,pilot_id)=>{
   
    if(vehicle_id!=null)
    {
        var vehicle = await Vehicle.findById(vehicle_id);
        if(!vehicle.pilots.includes(pilot_id))
        {
            vehicle.pilots.push(pilot_id);
            await vehicle.save();
        }
    }
   
}
vehicleHandler.addPilotToMany = async(vehicles_id,pilot_id)=>{
   
    if(vehicles_id!=null && vehicles_id.length>0)
   {
        await Promise.all(vehicles_id.map(async(vehicle_id)=>{
            await vehicleHandler.addPilotToOne(vehicle_id,pilot_id);  
        }))
   }
    
}
vehicleHandler.deletePilotFromOne= async(vehicle_id,pilot_id)=>
{
    var vehicle =  await Vehicle.findById(vehicle_id);
    vehicle.pilots= vehicle.pilots.filter((pilot)=>String(pilot).localeCompare(pilot_id)!=0)
    await vehicle.save();
}
vehicleHandler.deletePilotFromMany = async(vehicles_id,pilot_id)=>
{
    await Promise.all(vehicles_id.map(async(vehicle_id)=>{
        await vehicleHandler.deletePilotFromOne(vehicle_id,pilot_id);  
    }))
}
vehicleHandler.deleteAllPilots = async()=>{
    var vehicles = await Vehicle.find();
    vehicles.forEach(vehicle => {
        vehicle.pilots = []
        vehicle.save();       
    });
}
vehicleHandler.findVehiclesByURL = async(vehiclesURL)=>{
    
    var vehicles_ids = []
    await Promise.all(vehiclesURL.map(async(vehicleURL)=>{
        
        try
        {
            var vehicle = await Vehicle.findOne({url:vehicleURL});
            vehicles_ids.push(vehicle._id);
        }
        catch(err)
        {

        }
       
    }))

    return vehicles_ids;
}

module.exports = vehicleHandler;