import React, { Component, Fragment } from 'react';
import { WaetherMainContext } from './weather-main';
import WeatherDyas from './weather-days';
import shortid from 'shortid';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function WeatherDetailsTable(props) {

  const selectedDayIndex = props.match.params.day
  const shortId = shortid.generate;

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    <WaetherMainContext.Consumer>
      {({ mainStateWeatherData, selectedIndex }) => (

        <Fragment>
          <Grid container className={classes.root} spacing={4}>

            {mainStateWeatherData && mainStateWeatherData.list[selectedDayIndex].map(listItem => {
              return <WeatherDyas key={shortId()} weatherDaylistItem={listItem} />
            })
            }

          </Grid>
        </Fragment>
      )}
    </WaetherMainContext.Consumer>
  );
}

export default WeatherDetailsTable;




const useStyles = makeStyles(theme => ({
  root: {
    margin: '0 auto',
    flexGrow: 1,
    width: '66%'
  },

}))
