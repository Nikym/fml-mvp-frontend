/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Journey from '../journey/Journey';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  search: {
    maxWidth: 800,
    marginBottom: 20,
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
  searchText: {
    color: 'lightgrey',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 100,
  },
}));

const JourneysDisplay = () => {
  const classes = useStyles();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [journeys, setJourneys] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeFrom = (event) => {
    const { value } = event.target;
    setFrom(value);
  };

  const handleChangeTo = (event) => {
    const { value } = event.target;
    setTo(value);
  };

  const loadHistory = () => {
    setLoading(true);
    axios.get('http://localhost:9095/history', {
      params: {
        jwt: localStorage.getItem('accessToken'),
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setJourneys(res.data.journeys);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    axios.get('http://localhost:9095/journey', {
      params: {
        jwt: localStorage.getItem('accessToken'),
        start: from,
        end: to,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const { data: journey } = res;
          setJourneys((prevJourneys) => [journey, ...prevJourneys]);
        }
      })
      .catch((err) => {
        if (err.response) {
          axios.get(`https://api.tfl.gov.uk/Journey/JourneyResults/${from}/to/${to}`)
            .then((response) => {
              const { journeys: journeysArr } = response.data;
              let filteredRoutes = journeysArr.map((route) => ({
                journeyTime: route.duration,
                orderedLines: route.legs,
              }));
              filteredRoutes = filteredRoutes
                .map((route) => ({
                  journeyTime: route.journeyTime,
                  orderedLines: route.orderedLines
                    .map((line) => ({
                      name: line.routeOptions
                        .filter((routeOption) => !!routeOption.lineIdentifier),
                    }))
                    .filter((line) => line.name.length > 0)
                    .filter((line) => line.name[0].name.match('^[a-zA-Z\(\)]+$'))
                    .map((line) => ({ name: line.name[0].name })),
                }))
                .filter((route) => route.orderedLines.length > 0);

              axios.post('http://localhost:9095/journey', {
                start: from,
                end: to,
                token: localStorage.getItem('accessToken'),
                routes: filteredRoutes,
              })
                .then((resp) => {
                  if (resp.status === 200) {
                    loadHistory();
                  }
                });
            });
        }
      });
  };

  useEffect(() => {
    loadHistory();
  }, []);

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
              onClick={handleSubmit}
              disabled={!from || !to}
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
      {
        journeys.length > 0
          ? journeys.map((journey) => <Journey journey={journey} />)
          : (
            loading
              ? <p className={classes.searchText}>Loading...</p>
              : <p className={classes.searchText}>Search results appear here</p>
          )
      }
    </div>
  );
};

export default JourneysDisplay;
