var request = require("request");
const server = require('express').Router();
const {parsedBody} = require('body-parser');
const fetch = require('node-fetch');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var cache = []

server.get("/search/:q", (req, res) =>{
    const q = req.params.q
    
    if(cache.hasOwnProperty(q)){
        console.log("q existe en el cache")
        res.send(cache[q])
    }else
        {
            console.log("q no existe en cache, consulto ML")
            var request = new XMLHttpRequest();
            request.open('GET', 'https://api.mercadolibre.com/sites/MLA/search?&q=' + q , false)

            
            request.send(null);

            if (request.status === 200) {
            
            var bodyObject = JSON.parse(request.responseText);
            let ArrayFinal = []
            for (let i = 0; i < bodyObject.results.length; i++) {
             var NuevoProducto = {
    
             id : bodyObject.results[i].id,
             title: bodyObject.results[i].title,
             price: bodyObject.results[i].price,
             currency_id: bodyObject.results[i].currency_id,
             condition: bodyObject.results[i].condition,
             thumbnail: bodyObject.results[i].thumbnail,
             available_quantity: bodyObject.results[i].available_quantity 
    
            }
             ArrayFinal.push(NuevoProducto)
            }

            request.open('GET', 'https://api.mercadolibre.com/sites/MLA/search?limit=50&offset=51&q=' + q , false)

            
            request.send(null);

            if (request.status === 200) {
                console.log("Segunda llamada 200")
                var bodyObject = JSON.parse(request.responseText);
                for (let i = 0; i < bodyObject.results.length; i++) {
                 var NuevoProducto = {
    
                     id : bodyObject.results[i].id,
                     title: bodyObject.results[i].title,
                     price: bodyObject.results[i].price,
                     currency_id: bodyObject.results[i].currency_id,
                     condition: bodyObject.results[i].condition,
                     thumbnail: bodyObject.results[i].thumbnail,
                    available_quantity: bodyObject.results[i].available_quantity 
    
            }
             ArrayFinal.push(NuevoProducto);
            }
            }
                console.log("length = ",ArrayFinal.length)
                var Json = {"hits": ArrayFinal}
                cache[q] = Json
                console.log("cache =", cache)
                res.send(cache[q])
            } else
            {
                res.send('{"error": "No me pude comunicar con  mercado libre"}')
            }
    }
});




















module.exports =  server;