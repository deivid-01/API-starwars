const fetch = require("node-fetch");

const characterCtrl = require('../controllers/characters.controller');
const planetCtrl = require('../controllers/planets.controller');
const starshipCtrl = require('../controllers/starships.controller');
const vehicleCtrl = require('../controllers/vehicles.controller');
const planetResidentHandler = require('../handlers/planet/planet.resident.handler');

const swapiCtrl = {};

const BASE_URL = "https://swapi.dev/api"


swapiCtrl.resetData = async(req,res)=>{
    
    await swapiCtrl.deleteAll();

    await swapiCtrl.createPlanets();
    await swapiCtrl.createVehicles();
    await swapiCtrl.createStarships();
    await swapiCtrl.createCharacters();
    res.status(200).json({'msg':'Data from SWAPI created'})

}

swapiCtrl.createPlanets = async (res)=>{
    
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

swapiCtrl.createVehicles = async ()=>{
    
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

swapiCtrl.createStarships = async ()=>{
    
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

swapiCtrl.createCharacters = async ()=>{
    
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

swapiCtrl.deleteAll = async () =>
{
   await characterCtrl.deleteAll();
   await vehicleCtrl.deleteAll();
   await planetCtrl.deleteAll();
   await starshipCtrl.deleteAll();

   console.log("DATABASE RESETED");
}




module.exports = swapiCtrl;
