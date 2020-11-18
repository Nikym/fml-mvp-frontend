import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
  },
  title: {
    margin: 0,
  },
  line: {
    textAlign: 'center',
    flexGrow: 1,
    color: 'WhiteSmoke',
    borderRadius: 8,
    maxHeight: 20,
    zIndex: 0,
    margin: '0 10px',
  },
  route: {
    display: 'flex',
    padding: '20px 0',
    alignItems: 'center',
    '&:not(:last-of-type)': {
      borderBottom: '1px solid lightgrey',
    },
  },
  timeText: {
    margin: 0,
    marginRight: 10,
    color: '#888888',
  },
  stop: {
    borderRadius: '50%',
    border: '8px solid black',
    boxSizing: 'border-box',
    width: 30,
    minWidth: 30,
    height: 30,
    minHeight: 30,
    zIndex: 1,
  },
}));

const Stop = () => {
  const classes = useStyles();

  return (
    <div className={classes.stop} />
  );
};

const Line = ({ name }) => {
  const classes = useStyles();

  let colour;
  switch (name) {
    case 'DLR':
      colour = 'rgb(0,175,173)';
      break;
    case 'Bakerloo':
      colour = 'rgb(178,99,0)';
      break;
    case 'Central':
      colour = 'rgb(220,36,31)';
      break;
    case 'Circle':
      colour = 'rgb(255,211,41)';
      break;
    case 'District':
      colour = 'rgb(0,125,50)';
      break;
    case 'Hammersmith & City':
      colour = 'rgb(244,169,190)';
      break;
    case 'Jubilee':
      colour = 'rgb(161,165,167)';
      break;
    case 'Metropolitan':
      colour = 'rgb(155,0,88)';
      break;
    case 'Northern':
      colour = 'rgb(0,0,0)';
      break;
    case 'Piccadilly':
      colour = 'rgb(0,25,168)';
      break;
    case 'Victoria':
      colour = 'rgb(0,152,216)';
      break;
    case 'Waterloo & City':
      colour = 'rgb(47,206,186)';
      break;
    default:
      colour = 'grey';
  }

  return (
    <div className={classes.line} style={{ backgroundColor: colour }}>
      {name}
    </div>
  );
};

Line.propTypes = {
  name: PropTypes.string.isRequired,
};

const Route = ({ route }) => {
  const classes = useStyles();

  return (
    <div className={classes.route}>
      <p className={classes.timeText}>{`${route.journeyTime}m`}</p>
      <Stop />
      {route.orderedLines.map((line) => (
        <>
          <Line name={line.name} />
          <Stop />
        </>
      ))}
    </div>
  );
};

Route.propTypes = {
  route: PropTypes.shape().isRequired,
};

const Journey = ({ journey }) => {
  const classes = useStyles();
  const {
    start, end, routes, meanJourneyTime,
  } = journey;

  return (
    <Paper elevation={2} className={classes.root}>
      <h2 className={classes.title}>{`${start} to ${end}`}</h2>
      <p>{`Mean time: ${meanJourneyTime}m`}</p>
      {routes.map((route) => <Route route={route} />)}
    </Paper>
  );
};

Journey.propTypes = {
  journey: PropTypes.shape().isRequired,
};

export default Journey;
