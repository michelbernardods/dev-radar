const Dev = require('../models/Dev');
const parseStringAsArray = require('../models/utils/parseStringAsArray');


module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: techArray,
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 1000,
        },
      },
    });

    return res.json({ devs });
  },
};
