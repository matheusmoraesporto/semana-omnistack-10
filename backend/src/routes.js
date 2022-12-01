// Importa somente o módulo de rotas do express
const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

//DevController
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

//SearchControlelr
routes.get('/search', SearchController.index);

module.exports = routes;