import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Journey from '../journey/Journey';

const mockJourneys = {
  journeys: [
    {
      start: 'SE8 5RU',
      end: 'WC1A 2SL',
      routes: [
        {
          orderedLines: [
            {
              name: 'DLR',
            },
            {
              name: 'Victoria',
            },
          ],
          journeyTime: 35,
        },
        {
          orderedLines: [
            {
              name: 'Jubilee',
            },
          ],
          journeyTime: 20,
        },
      ],
      meanJourneyTime: 27.5,
      includesNoChangeRoute: true,
    },
    {
      start: 'SE8 5RU',
      end: 'WC1A 2SL',
      routes: [
        {
          orderedLines: [
            {
              name: 'DLR',
            },
            {
              name: 'Victoria',
            },
          ],
          journeyTime: 35,
        },
      ],
      meanJourneyTime: 27.5,
      includesNoChangeRoute: false,
    },
  ],
};

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
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleChangeFrom = (event) => {
    const { value } = event.target;
    setFrom(value);
  };

  const handleChangeTo = (event) => {
    const { value } = event.target;
    setTo(value);
  };

  const handleSubmit = () => {
  };

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
              value={from}
              onChange={handleChangeFrom}
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
              value={to}
              onChange={handleChangeTo}
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
              disabled={!from || !to}
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
      {mockJourneys.journeys.map((journey) => <Journey journey={journey} />)}
    </div>
  );
};

export default JourneysDisplay;
