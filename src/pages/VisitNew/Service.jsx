import React from 'react';
import {
  Box,
  Typography,
  Icon,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { ServiceIcon } from '../../components';

const useStyles = makeStyles((theme) => ({
  listItem: {
    border: '1px solid #DFDFDF',
    borderRadius: '10px',
    margin: theme.spacing(2, 0),
    padding: 0,
    paddingRight: theme.spacing(2),
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
    borderRadius: `10px 0 0 10px`,
  },
}));

const descriptions = {
  1: 'Assistance with bathing, personal hygiene, toileting or dressing.',
  2: 'Lifting and transfers, including from sit to stand, wheelchair assistance.',
  3: 'An in person reminder and assistance for scheduled medications',
  4: 'Transfers including from bed, sit to stand and wheelchair assistance',
  5: 'Assistance with bathing or showering',
  6: 'Assistance with selecting and putting on proper clothing',
  7: 'Assistance with grooming, oral, nail and hair care',
  8: 'Preparation of light meals (heating, table setting, light prep/cutting)',
  9: 'Assistance with taking meds on time',
  10: 'Assistance with  (wash, dry, fold, bedding change)',
  11: 'Light cleaning (sweep, vacuum), tidying up, removing trash and clutter (purchased in 60min increments)',
};

const Service = ({ onClick, id, name, included, fee }) => {
  const classes = useStyles();

  return (
    <ListItem button onClick={onClick} className={classes.listItem}>
      <Box className={classes.cardContainer}>
        <Box display="flex" flexDirection="row" mr={1}>
          <ListItemIcon className={classes.iconContainer}>
            {/* <ServiceIcon id={id} color="white" /> */}
          </ListItemIcon>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            pt={1}
            pb={1}
          >
            <Typography variant="h1" gutterBottom>
              <b>{name}</b>
            </Typography>

            <Typography variant="body2" gutterBottom>
              {descriptions[id]}
            </Typography>

            <Typography variant="h1" color="primary">
              <>$</>
              <>{(fee / 100).toFixed(2)}</>
            </Typography>
          </Box>
        </Box>

        <Icon color="primary" fontSize="large">
          {included ? 'check_circle' : 'radio_button_unchecked'}
        </Icon>
      </Box>
    </ListItem>
  );
};

export default Service;
