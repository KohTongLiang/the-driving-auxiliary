import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Fab, Paper, Container } from '@material-ui/core';
import { MyLocation as MyLocationIcon, Directions as DirectionsIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { toggleRoutePlanner } from '../../Action/HomeActions';
import Map from '../Map';
import RoutePlanner from '../Route/RoutePlanner';

const useStyles = makeStyles((theme) => ({
    navFab: {
        top: 'auto',
        right: 35,
        bottom: 150,
        position: 'fixed',
    },
    searchFab: {
        top: 'auto',
        right: 35,
        bottom: 80,
        position: 'fixed',
    },
    slidePanel: {
        width: '50%',
        left: 10,
        bottom: 45,
        position: 'fixed',
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

function mapDispatchToProps (dispatch) {
    return {
        toggleRoutePlanner: routePlannerView => dispatch(toggleRoutePlanner(routePlannerView)),
    }
}

/* *
 * Home page is where all subcomponents will be loaded into.

 * @Koh Tong Liang
 * @Version 2
 * @Since 31/10/2020
 * */
function HomeView (props) {
    /* *
    * const [x,setX] = useState() are essentially get and set for a variable/attribute
    * they will be used throughout the program as a way to store global values among some
    * of the components.
    * */
    const [plannerDialog, setPlannerDialog] = useState(false);
    const [userLocation, setUserLocation] = useState({lng: 0, lat: 0});
    const classes = useStyles();

    // to be shifted
    useEffect(() => {
        //console.log(userLocation);
    }, [userLocation])

   // to be shifted away
    const getUserLocation = () => {
        window.navigator.geolocation.watchPosition(position => {
            // to be modified
            setUserLocation(userLocation => ({ lng: position.coords.longitude, lat: position.coords.latitude }));
        });
    };

    // debug function to forcefully override user current location
    const debugOverrideUserLocation = lngLat => {
        setUserLocation(userLocation => lngLat);
    }

    // open route planner form page
    const toggleRoutePlanner = () => {
        setPlannerDialog(!plannerDialog);
        props.toggleRoutePlanner({plannerDialog});
    }

    return (
        <div>
            <Paper className={classes.slidePanel} elevation={5}>
                <Container>
                    <h4>Placeholder</h4>
                </Container>
            </Paper>

            <Fab className={classes.navFab} color="primary">
                <MyLocationIcon onClick={() => getUserLocation()} />
            </Fab>

            <Fab className={classes.searchFab} color="primary">
                <DirectionsIcon onClick={() => toggleRoutePlanner()}/>
            </Fab>

            {/* added debug function */}
            <Map userLocation={userLocation} debugOverrideUserLocation={debugOverrideUserLocation} />

            <RoutePlanner toggleRoutePlanner={toggleRoutePlanner}/>
        </div>
    )
}

const Home = connect(
    null,
    mapDispatchToProps,
    )(HomeView);

export default Home;