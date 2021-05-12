const Character = require('../models/character');

const characterCtrl = {}
//Post
characterCtrl.createOne = async(req,res) => {

    var character=  new Character(req.body);
    
    await character.save();
    res.json({
        'status':'Character saved'
    })
}
//Get
characterCtrl.getOne = async(req,res) =>{
    
    var character = await Character.findById(req.params.id);
    res.json(character);
}


characterCtrl.getAll = async(req,res) =>{
    
    var characters = await Character.find();
    res.json(characters);
}
//Put
characterCtrl.updateOne = async(req,res) =>{
    await Character.findByIdAndUpdate(req.params.id,req.body);
    res.status(201).json({msg:' Character uploaded'});
}
//Delete
characterCtrl.deleteOne = async( req,res) => {
    await Character.findByIdAndDelete(req.params.id);
    res.json({"msg":"Character deleted"});

}

characterCtrl.deleteMany = async(req,res)=>{
    await Character.deleteMany({});
    res.json({"msg":"All Characters has been deleted"});

}

module.exports = characterCtrl;
