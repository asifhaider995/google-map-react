import React from 'react';
import {withScriptjs, withGoogleMap} from 'react-google-maps';
import {Grid, makeStyles} from '@material-ui/core';
import Map from './components/Map';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '40rem'
  },
  infoWindow: {
    width: '20rem',
    height: '100%',
    padding: '.5rem .25rem .5rem .5rem',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '.25rem .125rem .25rem .25rem',
    }
  },
  typoName: {
    textAlign: 'left',
    margin: '1rem 0',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    }
  },
  typoLatLng: {
    textAlign: 'justify',
    margin: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px'
    }
  },
  btn: {
    marginTop: '.5rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '.25rem',
      width: '80%',
      marginLeft: '1rem'
    }
  }

}))
const KEY = process.env.REACT_APP_API_KEY;
// const myLatLng = {lat: parseFloat(23.784330), lng: parseFloat(90.435754)}


const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  const classes = useStyles();
  const [currentLocation, setCurrentLocation] = React.useState(null);
  function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let currLat = parseFloat(position.coords.latitude);
      let currLng = parseFloat(position.coords.longitude);
      setCurrentLocation({lat: currLat, lng: currLng});
    });
  } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  getLocation();
  return (
    <Grid className={classes.root}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${KEY}`}
        loadingElement={<div style={{height: '100%'}} />}
        containerElement={<div style={{ height: `41rem` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        currentLocation={currentLocation}
      />
    </Grid>
  );
}

export default App;
