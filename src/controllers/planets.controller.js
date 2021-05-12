const Planet = require('../models/planet');

const planetCtrl = {}
//Post
planetCtrl.createOne = async(req,res) => {

    var planet=  new Planet(req.body);
    
    await planet.save();
    res.json({
        'status':'Planet saved'
    })
}
//Get
planetCtrl.getOne = async(req,res) =>{
    
    var planet = await Planet.findById(req.params.id);
    res.json(planet);
}


planetCtrl.getAll = async(req,res) =>{
    
    var planets = await Planet.find();
    res.json(planets);
}
//Put
planetCtrl.updateOne = async(req,res) =>{
    await Planet.findByIdAndUpdate(req.params.id,req.body);
    res.status(201).json({msg:' Planet uploaded'});
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

module.exports = planetCtrl;
