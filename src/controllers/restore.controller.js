const fetch = require("node-fetch");

const characterCtrl = require('./characters.controller');
const planetCtrl = require('./planets.controller');
const starshipCtrl = require('./starships.controller');
const vehicleCtrl = require('./vehicles.controller');
const planetResidentHandler = require('../handlers/planet/planet.resident.handler');

const restoreCtrl = {};

const BASE_URL = "https://swapi.dev/api"


restoreCtrl.resetData = async(req,res)=>{
    
    await restoreCtrl.deleteAll();

    await restoreCtrl.createPlanets();
    await restoreCtrl.createVehicles();
    await restoreCtrl.createStarships();
    await restoreCtrl.createCharacters();
    res.status(200).json({'msg':'Data from SWAPI created'})

}

restoreCtrl.createPlanets = async (res)=>{
    
   var actualPage = 1;
   do
   {
      var planets_URL = BASE_URL+`/planets/?page=${actualPage}`;
    
      var planetsJSON = await (await fetch(planets_URL)).json();
      
      await planetCtrl.createManyFromSWAPI(planetsJSON.results);

      actualPage +=1;
      
   }
    while ( planetsJSON.next!=null);


   console.log("PLANETS  CREATED");
}

restoreCtrl.createVehicles = async ()=>{
    
   var actualPage = 1;
   do
   {
      var vehicles_URL = BASE_URL+`/vehicles/?page=${actualPage}`;
    
      var vehiclesJSON = await (await fetch(vehicles_URL)).json();
      
      await vehicleCtrl.createManyFromSWAPI(vehiclesJSON.results);

      actualPage +=1;
      
   }
    while ( vehiclesJSON.next!=null);


   console.log("VEHICLES  CREATED");
}

restoreCtrl.createStarships = async ()=>{
    
   var actualPage = 1;
   do
   {
      var starships_URL = BASE_URL+`/starships/?page=${actualPage}`;
    
      var starshipsJSON = await (await fetch(starships_URL)).json();
      
      await starshipCtrl.createManyFromSWAPI(starshipsJSON.results);

      actualPage +=1;
      
   }
    while ( starshipsJSON.next!=null);


   console.log("STARSHIPS  CREATED");
}

restoreCtrl.createCharacters = async ()=>{
    
   var actualPage = 1;
   do
   {
      var characters_URL = BASE_URL+`/people/?page=${actualPage}`;
    
      var charactersJSON = await (await fetch(characters_URL)).json();
      
      await characterCtrl.createManyFromSWAPI(charactersJSON.results);

      actualPage +=1;
      
   }
    while ( charactersJSON.next!=null);


   console.log("CHRACTERS  CREATED");
}

restoreCtrl.deleteAll = async () =>
{
   await characterCtrl.deleteAll();
   await vehicleCtrl.deleteAll();
   await planetCtrl.deleteAll();
   await starshipCtrl.deleteAll();

   console.log("DATABASE RESETED");
}




module.exports = restoreCtrl;
