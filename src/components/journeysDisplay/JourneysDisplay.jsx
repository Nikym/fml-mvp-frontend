import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  search: {
    maxWidth: 800,
  },
  inputs: {
    marginRight: 20,
    '&:last-of-type': {
      marginRight: 0,
    },
  },
  button: {
    height: 54,
    backgroundColor: 'rgb(0,25,168)',
    '&:hover': {
      backgroundColor: 'rgb(20,45,188)',
    },
    color: 'WhiteSmoke',
  },
}));

const JourneysDisplay = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Find me a journey...</h2>
      <Grid container id="search" className={classes.search} spacing={2}>
        <Grid item xs={12} sm={4} style={{ alignItems: 'center' }}>
          <Box className={classes.inputs}>
            <TextField
              variant="outlined"
              id="from"
              label="From"
              helperText="Eg, SE8 5RU"
              // size="small"
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box className={classes.inputs}>
            <TextField
              variant="outlined"
              id="to"
              label="To"
              helperText="Eg, WC1A 2SL"
              // size="small"
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={4} style={{ alignItems: 'center' }}>
          <Box>
            <Button
              startIcon={<SearchRoundedIcon />}
              variant="contained"
              size="large"
              className={classes.button}
              fullWidth
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default JourneysDisplay;
