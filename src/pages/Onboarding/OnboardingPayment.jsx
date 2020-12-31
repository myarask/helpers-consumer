import React, { useState } from 'react';
import { Box, InputLabel, LinearProgress } from '@material-ui/core';
import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { makeStyles } from '@material-ui/core/styles';
import { useMutation, gql } from '@apollo/client';
import { useIdentity } from 'providers/Identity';
import visaCard from 'assets/visa.svg';
import masterCard from 'assets/master.svg';
import Stepper from './Stepper';

const useStyles = makeStyles((theme) => ({
  stripeElementWrapper: {
    width: '100%',
    color: theme.palette.primary.main,
  },
  stripeForm: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  stripeFormIcon: {
    marginRight: '5px',
  },
}));

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

const OnboardingPayment = () => {
  const { refetch } = useIdentity();
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

    const variables = {
      paymentMethodId: paymentMethod.id,
    };

    await saveMyCard({ variables });
    await refetch();

    setIsSubmitting(false);
  };

  // According to stripe, it's recommended to not hide postal code, to reduce fraud.
  // I commented it out because it was using the americon zip code system.

  const styles = useStyles();

  return (
    <Box flexGrow={1} height="100%" display="flex" flexDirection="column">
      <Box flexGrow={1} p={2}>
        <form className={styles.stripeForm} onSubmit={handleSubmit}>
          <InputLabel variant="h2" htmlFor="card-element">
            Please provide payment details
          </InputLabel>

          <Box pb={2}>
            <img src={visaCard} className={styles.stripeFormIcon} />
            <img src={masterCard} className={styles.stripeFormIcon} />
          </Box>

          <label className={styles.stripeElementWrapper}>
            Card number
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
          </label>

          <label className={styles.stripeElementWrapper}>
            Expiration date
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
          </label>

          <label className={styles.stripeElementWrapper}>
            CVC
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
          </label>
        </form>
      </Box>
      {isSubmitting && <LinearProgress />}
      <Stepper
        activeStep={2}
        onNext={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </Box>
  );
};

export default OnboardingPayment;
