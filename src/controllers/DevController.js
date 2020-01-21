// Dependences...
const axios = require('axios');

// Models...
const Dev = require('../models/Dev');

// Utils...
const parseStringAsArray = require('../utils/parseStringAsArray');

const { findConnections, sendMessage } = require('../websocket');

// index, show, update, store, destroy
module.exports = {
  async store( req, res ) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if( !dev ) {
      response = await axios.get(`https://api.github.com/users/${ github_username }`);

      const {
        name = login,
        avatar_url,
        bio,
      } = response.data;

      const techsArray = parseStringAsArray( techs );

      const location = {
        type: 'Point',
        coordinates: [ longitude, latitude ],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      // Filtrar as conexões que estão há no máximo 10km de distância
      // e que o novo dev tenha pelo menos uma das tecnologias filtradas...

      const sendSocketMessageTo = findConnections({ latitude, longitude }, techsArray );

      sendMessage( sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json( dev );
    // return res.json({ success: true, message: 'Dev cadastrado com sucesso!'});
  },

  async index( req, res ) {
    const devs = await Dev.find();

    return res.json( devs );
  },
};