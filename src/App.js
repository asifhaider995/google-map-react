import React from 'react';
import {GoogleMap, withScriptjs, withGoogleMap, InfoWindow, Marker } from 'react-google-maps';
import {Grid, Typography, Button, makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '40rem'
  },
  infoWindow: {
    width: '20rem',
    height: '100%',
    padding: '1rem .5rem 1rem 1rem'
  },
  typoName: {
    textAlign: 'left',
    margin: '1rem 0',
    fontWeight: 'bold'
  },
  typoLatLng: {
    textAlign: 'left',
    margin: '1rem 0'
  },
  btn: {
    marginTop: '.5rem'
  }

}))
const KEY = process.env.REACT_APP_API_KEY;
// const myLatLng = {lat: parseFloat(23.784330), lng: parseFloat(90.435754)}

function Map(props) {
  const [latLng, setLatLng] = React.useState({});
  const [infoWindow, setInfoWindow] = React.useState(null);

  React.useEffect(()=>{
    setLatLng(props.currentLocation);
  },[props.currentLocation])

  const handleMapClick = (event) => {
    let latString = event.latLng.toString().split(", ")[0];
    let lngString = event.latLng.toString().split(", ")[1];
    let latFloat = parseFloat(latString.slice(1,latString.length));
    let lngFloat = parseFloat(lngString.slice(0,lngString.length-1));
    setLatLng({lat: latFloat, lng: lngFloat})

  }
  const handleMarkerClick = (event) => {
    let latString = event.latLng.toString().split(", ")[0];
    let lngString = event.latLng.toString().split(", ")[1];
    let latFloat = parseFloat(latString.slice(1,latString.length));
    let lngFloat = parseFloat(lngString.slice(0,lngString.length-1));
    setInfoWindow({lat: latFloat, lng: lngFloat})
  }

  const handleInfoClose = (e) => {
    setInfoWindow(null)
  }

  const classes = useStyles();
  return (
    <GoogleMap onClick={handleMapClick} defaultZoom={10} defaultCenter={{lat: 23.780622, lng: 90.425636}}>
      <Marker
        onClick={handleMarkerClick}
        position={latLng}
      />
      {infoWindow && (
        <InfoWindow position={infoWindow} onCloseClick={handleInfoClose}>
          <Grid className={classes.infoWindow}>
            <Typography className={classes.typoName}>Name: Asif Haider Khan</Typography>
            <Typography className={classes.typoLatLng}>Latitude: {latLng.lat}</Typography>
            <Typography className={classes.typoLatLng}>Longitude: {latLng.lng}</Typography>
            <Button
              onClick={()=>{console.log("Latitude: ", latLng.lat, "Longitude: ", latLng.lng);}}
              variant="contained"
              color="primary"
              fullWidth
              className={classes.btn}
            > Send Data </Button>
          </Grid>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}

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
