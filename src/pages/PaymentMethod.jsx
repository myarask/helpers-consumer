import React, { useState } from 'react';
import { useLocation, useHistory, generatePath } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useIdentity } from 'providers/Identity';
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import paths from 'constants/paths';
import visaCard from 'assets/visa.svg';
import masterCard from 'assets/master.svg';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      letterSpacing: '0.025em',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const PaymentMethod = () => {
  // According to stripe, it's recommended to not hide postal code, to reduce fraud.
  // I commented it out because it was using the americon zip code system.

  const query = new URLSearchParams(useLocation().search);
  const history = useHistory();
  const { refetch, myUser } = useIdentity();
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SAVE_MY_CARD = gql`
    mutation SaveMyCard($paymentMethodId: String!) {
      saveMyCard(paymentMethodId: $paymentMethodId)
    }
  `;

  const [saveMyCard] = useMutation(SAVE_MY_CARD);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });

    if (error) {
      setIsSubmitting(false);
      return;
    }

    const variables = { paymentMethodId: paymentMethod.id };

    await saveMyCard({ variables });
    await refetch();

    const visitId = query.get('visitId');
    if (visitId) {
      const path = generatePath(paths.visit, { id: visitId });
      history.push(path);
    }

    setIsSubmitting(false);
  };

  return (
    <Box p={2}>
      <Typography variant="h1" gutterBottom>
        Payment Method
      </Typography>
      <Box
        component="form"
        display="flex"
        justifyContent="center"
        flexDirection="column"
        onSubmit={handleSubmit}
      >
        {/* <InputLabel variant="h2" htmlFor="card-element">
          Please provide payment details
        </InputLabel> */}

        <Box pb={2}>
          <Box component="img" src={visaCard} mr={1} alt="VISA card" />
          <img src={masterCard} alt="Mastercard" />
        </Box>

        <Typography component="div" color="primary" variant="body2">
          Card number
          <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
        </Typography>

        <Typography component="div" color="primary" variant="body2">
          Expiration date
          <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
        </Typography>

        <Typography component="div" color="primary" variant="body2">
          CVC
          <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
        </Typography>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          color="primary"
          disabled={isSubmitting}
        >
          Save Card
        </Button>
        {myUser.customerId && (
          <Box pt={2}>
            <Typography>
              There is a card registered to this account. This form may be used
              to switch to another credit card.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PaymentMethod;
