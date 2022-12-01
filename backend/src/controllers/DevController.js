const axios = require('axios');
const Dev = require('../models/Dev');
const StringAsArray = require('../utils/parseStringAsArray');
const { findConnections , sendMessage} = require('../websocket');

// index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();
        return response.json(devs);
    },

    async store(request, response) {
        // Valores enviados by insomnia
        const { github_username, techs, latitude, longitude } = request.body;

        // Busca no banco o user
        // Usa o let para sobrepor dentro do if
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            // Await com o async, faz com que aguarde o retorno da api
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            
            // Valores encontrados pela API
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            // Transforma em array a string separada por virgulas com as tecnologias
            const techsArray = StringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username, //Shortname, como já existe uma variável com esse nome o js já interpreta que estamos atribuindo a mesma
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            // Filtrar as conexões que estão há no máximo 10km de distância e que o novo dev tenha pelo menos uma das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray
            );

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
        return response.json(dev);
    },

    async update() {

    },

    async destroy() {
        
    }
};