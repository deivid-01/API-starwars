const Starship = require('../models/starship');

const starshipCtrl = {}
//Post
starshipCtrl.createOne = async(req,res) => {

    var starship=  new Starship(req.body);
    
    await starship.save();
    res.json({
        'status':'Starship saved'
    })
}
//Get
starshipCtrl.getOne = async(req,res) =>{
    
    var starship = await Starship.findById(req.params.id);
    res.json(starship);
}


starshipCtrl.getAll = async(req,res) =>{
    
    var starships = await Starship.find();
    res.json(starships);
}
//Put
starshipCtrl.updateOne = async(req,res) =>{
    await Starship.findByIdAndUpdate(req.params.id,req.body);
    res.status(201).json({msg:' Starship uploaded'});
}
//Delete
starshipCtrl.deleteOne = async( req,res) => {
    await Starship.findByIdAndDelete(req.params.id);
    res.json({"msg":"Starship deleted"});

}

starshipCtrl.deleteMany = async(req,res)=>{
    await Starship.deleteMany({});
    res.json({"msg":"All Starships has been deleted}"});

}

module.exports = starshipCtrl;
