const { ApolloError } = require('apollo-server-express');
const stripe = require('stripe')('sk_test_NNhGKPuoWvEW04vNLEaLcNmY00BvjFUNKE');

module.exports = {
  async draftVisit(_, { input }, { models, user }) {
    const { serviceIds, notes, clientId } = input;

    const { id: userId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    const {
      city,
      country,
      line1,
      line2,
      postalCode,
      state,
    } = await models.Client.findOne({ where: { id: clientId } });

    const services = await models.Service.findAll({
      where: { id: serviceIds },
    });

    const visit = await models.Visit.create({
      userId,
      city,
      country,
      line1,
      line2,
      postalCode,
      state,
      notes,
      clientId,
      baseFee: 1000,
    });

    const visitServices = services.map((service) => ({
      visitId: visit.id,
      serviceId: service.id,
      name: service.name,
      fee: service.fee,
    }));

    await models.VisitService.bulkCreate(visitServices);

    return visit;
  },
  async releaseVisit(_, { id }, { models, user }) {
    const { id: userId, customerId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    const visit = await models.Visit.findOne({
      where: { id },
      include: models.VisitService,
    });

    if (visit.userId !== userId) {
      throw new ApolloError(
        `You do not have permission to modify visit ${id}`,
        'PERMISSIONS'
      );
    }

    if (visit.releasedAt) {
      throw new ApolloError(
        `Visit ${id} has already been released`,
        'NOT_ALLOWED'
      );
    }

    const { baseFee, VisitServices } = visit.dataValues;
    let amount = baseFee;
    VisitServices.forEach((service) => {
      amount += service.dataValues.fee;
    });

    amount = Math.round(amount * 1.13);

    // TODO: save and use PaymentMethodId in DB so that
    // it doesn't need to be retrieved from stripe
    const customer = await stripe.customers.retrieve(customerId);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'cad',
      customer: customerId,
      confirm: true,
      payment_method: customer.invoice_settings.default_payment_method,
    });

    return models.Visit.update(
      {
        releasedAt: models.sequelize.literal('CURRENT_TIMESTAMP'),
        paymentIntentId: paymentIntent.id,
      },
      { where: { id } }
    );
  },
  async cancelVisit(_, { id }, { models, user }) {
    const { id: userId } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    const visit = await models.Visit.findOne({
      where: { id },
      include: models.VisitService,
    });

    if (visit.userId !== userId) {
      throw new ApolloError(
        `You do not have permission to modify visit ${id}`,
        'PERMISSIONS'
      );
    }

    if (visit.cancelledAt) {
      throw new ApolloError(
        `Visit ${id} has already been cancelled`,
        'NOT_ALLOWED'
      );
    }

    if (visit.finisehdAt) {
      throw new ApolloError(
        `Visit ${id} has already been finished`,
        'NOT_ALLOWED'
      );
    }

    if (visit.startedAt) {
      throw new ApolloError(
        `Visit ${id} has already been started`,
        'NOT_ALLOWED'
      );
    }

    let amount = 0;
    visit.dataValues.VisitServices.forEach((service) => {
      amount += service.dataValues.fee;
    });

    amount = Math.round(amount * 1.13);

    await stripe.refunds.create({
      amount,
      payment_intent: visit.paymentIntentId,
    });

    return models.Visit.update(
      { cancelledAt: models.sequelize.literal('CURRENT_TIMESTAMP') },
      { where: { id } }
    );
  },
};
