// Models...
const Dev = require('../models/Dev');

// Utils...
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index( req, res ) {
      // Buscar todos os devs num raio de 10km...
      // Por tecnologias...

      const { latitude, longitude, techs } = req.query;

      techsArray = parseStringAsArray( techs );

      const devs = await Dev.find({
        techs: {
          $in: techsArray,
        },

        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [ longitude, latitude ],
            },

            $maxDistance: 10000,
          },
        },
      });

      return res.json( devs );
  },
}