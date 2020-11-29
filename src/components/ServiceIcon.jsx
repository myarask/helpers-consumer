import React from 'react';
import { makeStyles } from '@material-ui/styles';
import personalCareTeal from '../assets/helping-hands-teal.svg';
import medicationReminderTeal from '../assets/medication-teal.svg';
import mobilityAssistTeal from '../assets/wheelchair-teal.svg';
import personalCareWhite from '../assets/helping-hands-white.svg';
import medicationReminderWhite from '../assets/medication-white.svg';
import mobilityAssistWhite from '../assets/wheelchair-white.svg';

const useStyles = makeStyles(() => ({
  small: {
    maxHeight: '1rem',
  },
  medium: {
    maxHeight: '1.5rem',
  },
}));

const services = {
  primary: {
    1: personalCareTeal,
    2: mobilityAssistTeal,
    3: medicationReminderTeal,
  },
  white: {
    1: personalCareWhite,
    2: mobilityAssistWhite,
    3: medicationReminderWhite,
  },
};

const ServiceIcon = ({ id, name, size, color }) => {
  const classes = useStyles();

  return <img src={services[color][id]} className={classes[size]} alt={name} />;
};

ServiceIcon.defaultProps = {
  color: 'primary',
  size: 'medium',
};

export default ServiceIcon;
