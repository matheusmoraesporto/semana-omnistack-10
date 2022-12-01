const mongoose = require('mongoose');
// Importa o PointSchema
const PointSchema = require('./utils/PointSchema');

// Cria o schema da model
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere' // eixo xy
    }
});

module.exports = mongoose.model('Dev', DevSchema);