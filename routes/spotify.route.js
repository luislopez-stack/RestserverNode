/*
    Spotify API Token server
        Esta aplicación únicamente toma el CLIENTID y CLIENTSecret
        que brinda spotify, para obtener el token mediante una petición
        POST desde el front-end. 
*/
const { Router } = require("express");
const { getTokenSy, getRspuesta } = require("../controllers/spotify.controller");

const router = new Router();

router.get('/', getTokenSy);


module.exports = router;