const { Op } = require('sequelize');

module.exports = {
  activeVisits: async (_, __, { models, user }) => {
    const { id: userId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    return models.Visit.findAll({
      where: {
        userId,
        cancelledAt: null,
        finishedAt: null,
        releasedAt: {
          [Op.not]: null,
        },
      },
    });
  },
  myUser: (_, __, { models, user }) => {
    return models.User.findOne({ where: { auth0Id: user.sub } });
  },
  services: (_, __, { models }) => {
    return models.Service.findAll();
  },
  visit: async (_, { id }, { models, user }) => {
    // A user is only allowed to read their
    const me = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    if (!me) return [];

    return models.Visit.findOne({ where: { id, userId: me.id } });
  },
};
