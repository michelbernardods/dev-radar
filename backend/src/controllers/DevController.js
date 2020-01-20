const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../models/utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {

  // search
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },


  // create
  async store(req, res) {
    const {
      github_username, techs, latitude, longitude,
    } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio } = response.data;

      const tecnologias = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: tecnologias,
        location,
      });

      // Filtrar as conexões no máximo 10km
      // e que tem pelo menos uma tecnología

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        tecnologias,
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }


    return res.json(dev);
  },
};
