import React from 'react';
import { Box, LinearProgress, Typography } from '@material-ui/core';
import gql from 'graphql-tag';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import * as Yup from 'yup';
import { useIdentity } from 'providers/Identity';
import Stepper from './Stepper';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('This field is required')
    .max(255, '255 Character Maximum'),
  city: Yup.string()
    .required('This field is required')
    .max(255, '255 Character Maximum'),
  country: Yup.string()
    .required('This field is required')
    .max(255, '255 Character Maximum'),
  line1: Yup.string()
    .required('This field is required')
    .max(255, '255 Character Maximum'),
  line2: Yup.string().max(255, '255 Character Maximum'),
  postalCode: Yup.string()
    .required('This field is required')
    .max(255, '255 Character Maximum'),
  state: Yup.string()
    .required('This field is required')
    .max(255, '255 Character Maximum'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const initialValues = {
  fullName: '',
  city: '',
  country: '',
  line1: '',
  line2: '',
  postalCode: '',
  state: '',
  phoneNumber: '',
};

const CREATE_MY_CLIENT = gql`
  mutation CreateMyClient($values: ClientInput!) {
    createMyClient(values: $values) {
      id
    }
  }
`;

const OnboardingHelp = () => {
  const { refetch } = useIdentity();
  const [createMyClient] = useMutation(CREATE_MY_CLIENT);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        await createMyClient({ variables: { values } });
        await refetch();
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Box flexGrow={1} height="100%" display="flex" flexDirection="column">
          <Box flexGrow={1} p={2}>
            <Typography variant="h1">Client contact information</Typography>
            <Form>
              <Field
                fullWidth
                component={TextField}
                name="fullName"
                label="Full Name"
              />
              <Field
                fullWidth
                component={TextField}
                name="phoneNumber"
                label="Phone Number"
              />
              <Field fullWidth component={TextField} name="city" label="City" />
              <Field
                fullWidth
                component={TextField}
                name="state"
                label="Province/State"
              />
              <Field
                fullWidth
                component={TextField}
                name="country"
                label="Country"
              />
              <Field
                fullWidth
                component={TextField}
                name="line1"
                label="Line1"
              />
              <Field
                fullWidth
                component={TextField}
                name="line2"
                label="Line2"
              />
              <Field
                fullWidth
                component={TextField}
                name="postalCode"
                label="Postal Code"
              />
            </Form>
          </Box>
          {isSubmitting && <LinearProgress />}
          <Stepper
            activeStep={1}
            onNext={submitForm}
            isSubmitting={isSubmitting}
          />
        </Box>
      )}
    </Formik>
  );
};

export default OnboardingHelp;
