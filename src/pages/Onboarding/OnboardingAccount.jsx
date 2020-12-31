import React from 'react';
import { LinearProgress, Box, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import { useMutation, gql } from '@apollo/client';
import * as Yup from 'yup';
import { phoneRegExp } from 'utils/regexs';
import { useIdentity } from 'providers/Identity';
import Stepper from './Stepper';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('This field is required')
    .max(255, '255 Character Maximum'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const CREATE_MY_USER = gql`
  mutation CreateMyUser($fullName: String!, $phoneNumber: String) {
    createMyUser(fullName: $fullName, phoneNumber: $phoneNumber) {
      id
    }
  }
`;

const initialValues = {
  fullName: '',
  phoneNumber: '',
};

const OnboardingAccount = () => {
  const { refetch } = useIdentity();

  const [createMyUser] = useMutation(CREATE_MY_USER);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (variables) => {
        await createMyUser({ variables });
        await refetch();
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Box flexGrow={1} height="100%" display="flex" flexDirection="column">
          <Box flexGrow={1} p={2}>
            <Typography variant="h1">Contact Information</Typography>

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
            </Form>
          </Box>
          {isSubmitting && <LinearProgress />}
          <Stepper
            activeStep={0}
            onNext={submitForm}
            isSubmitting={isSubmitting}
          />
        </Box>
      )}
    </Formik>
  );
};

export default OnboardingAccount;
