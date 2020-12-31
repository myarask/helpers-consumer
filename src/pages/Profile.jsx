import React from 'react';
import { Box, Typography, Card, Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { Formik, Field, Form } from 'formik';
import { phoneRegExp } from 'utils/regexs';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useIdentity } from 'providers/Identity';

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('This field is required')
    .max(255, '255 Character Maximum'),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const UPDATE_MY_USER = gql`
  mutation UpdateMyUser($fullName: String!, $phoneNumber: String) {
    updateMyUser(fullName: $fullName, phoneNumber: $phoneNumber) {
      id
    }
  }
`;

const Profile = () => {
  const { myUser, refetch } = useIdentity();
  const [updateMyUser] = useMutation(UPDATE_MY_USER);

  return (
    <Formik
      initialValues={{
        fullName: myUser.fullName,
        phoneNumber: myUser.phoneNumber,
      }}
      validationSchema={validationSchema}
      onSubmit={async (variables) => {
        await updateMyUser({ variables });
        await refetch();
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Box flexGrow={1} height="100%" display="flex" flexDirection="column">
          <Box flexGrow={1} p={2}>
            <Box mb={1}>
              <Typography variant="h1">Profile Information</Typography>
            </Box>

            <Card>
              <Box p={2}>
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
            </Card>
            <Box p={2}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {isSubmitting ? 'Submitting' : 'Submit'}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Formik>
  );
};

export default Profile;
