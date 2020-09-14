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
    handleInfoClose();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Latitude: ", latLng.lat, "Longitude: ", latLng.lng);
  }

  const classes = useStyles();

  return (
    <GoogleMap onClick={handleMapClick} defaultZoom={10} defaultCenter={{lat: 23.780622, lng: 90.425636}}>
      <Marker
        onClick={handleMarkerClick}
        position={latLng}
      />
      {(infoWindow!=null) && (
        <InfoWindow defaultZIndex={1000} position={infoWindow} onCloseClick={handleInfoClose}>
          <Grid className={classes.infoWindow}>
            <Typography className={classes.typoName}>Name: Asif Haider Khan</Typography>
            <form className={classes.mapForm} onSubmit={handleSubmit}>
              <Typography className={classes.typoLatLng}>Your current location is - </Typography>
              <Typography className={classes.typoLatLng}>Latitude: <strong>{latLng.lat}</strong></Typography>
              <Typography className={classes.typoLatLng}>Longitude: <strong>{latLng.lng}</strong></Typography>
              <Button
              type='submit'
              variant="contained"
              color="primary"
              fullWidth
              className={classes.btn}
              > Send Data </Button>
            </form>
          </Grid>
        </InfoWindow>
      )}
    </GoogleMap>
  )
}
export default Map;
