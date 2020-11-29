// TODO: put key in env variables
const stripe = require('stripe')('sk_test_NNhGKPuoWvEW04vNLEaLcNmY00BvjFUNKE');
const visits = require('./Mutation/visits');

module.exports = {
  async createMyUser(_, { fullName, phoneNumber }, { models, auth0, user }) {
    // Deprecated when onboarding was removed
    const auth0Id = user.sub;

    const { data } = await auth0.get(`users/${user.sub}`);
    const { email } = data;

    return models.User.create({ email, auth0Id, fullName, phoneNumber });
  },
  async updateMyUser(_, { fullName, phoneNumber }, { models, user }) {
    return models.User.update(
      { fullName, phoneNumber },
      { returning: true, plain: true, where: { auth0Id: user.sub } }
    )[1];
  },
  async createMyClient(_, { values }, { models, user }) {
    // Deprecated when onboarding was removed
    const { id } = await models.User.findOne({ where: { auth0Id: user.sub } });

    return models.Client.create({
      ...values,
      userId: id,
    });
  },
  ...visits,
  async saveMyCard(_, { paymentMethodId }, { models, user }) {
    const { id, customerId, email, fullName } = await models.User.findOne({
      where: { auth0Id: user.sub },
    });

    // Add payment method to existing customer, if there is one.
    if (customerId) {
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

      await stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });

      return customerId;
    }

    // Create a new customer with a payment method if there is no customer ID.
    const newCustomer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email,
      name: fullName,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    await models.User.update({ customerId: newCustomer.id }, { where: { id } });

    return newCustomer.id;
  },
};
