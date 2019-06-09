import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { WaetherMainContext } from './weather-main';
import { convertScale, dateConvert, convertPipeMKm } from '../pipes';
import { BrowserRouter as Router, Link } from "react-router-dom";


function WeatherBoxItem({ weatherListItem: weatherDayItem, maxMinTemp, city, maxMinHum, posInd }) {
  const classes = useStyles();

  return (
    <WaetherMainContext.Consumer>

      {({ mainStateWeatherData, selectedIndex }) => (
        <Fragment> 

          <Card className={classes.card}>
            <CardContent>

              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {dateConvert('day', weatherDayItem[selectedIndex].dt_txt)}
              </Typography>
              <br />

                <CardMedia
                  className={classes.media}
                  image={weatherDayItem[selectedIndex].weather[0].icon}
                  title="pagoda"
                  />

              <CardActionArea>
                <Typography variant="body2" component="p" className={classes.tempMinMax}>
                  <span className={classes.bullet}> Temp: </span>
                  <span className={classes.bullet}>{convertScale('celcius', maxMinTemp.dayMax)} -</span>
                  <span className={classes.bullet}>{convertScale('celcius', maxMinTemp.dayMin)}</span>
                </Typography>

                <Typography variant="body2" component="h6" className={classes.tempMinMax}>
                  <span className={classes.bullet}> Wind speed: </span>
                  <span className={classes.bullet}>{ weatherDayItem[selectedIndex].wind.speed}</span>
                </Typography>
                                                    
                <Typography variant="body2" component="p" className={classes.tempMinMax}>
                  <span className={classes.bullet}>Cloud:</span>
                  <span className={classes.bullet}> {weatherDayItem[selectedIndex].clouds.all}%</span>
                </Typography>

                <Typography className={classes.mainTmp} color="textSecondary">
                  {convertScale('celcius', weatherDayItem[selectedIndex].main.temp)}
                </Typography>

              </CardActionArea>
            </CardContent>
            <CardActions>
              <Link to={`/${posInd}`}>
                <Button size="small">Learn More</Button>
              </Link>
              <Link to="/">
                <Button size="small">Close</Button>
              </Link>

            </CardActions>
          </Card>
        </Fragment>
      )}
    </WaetherMainContext.Consumer>
  );

}

export default WeatherBoxItem;





const useStyles = makeStyles({ 
  main: {
    position: 'absolute'
  },
  card: {
    minWidth: 225,
    margin: '57px 4px 16px',
    display: 'inline-block',
    // boxShadow: '-9px -2px 46px 3px grey'
  },
  bullet: {
    display: 'contents',
    transform: 'scale(0.8)',
    fontSize: '120%'
  }, 
  title: {
    fontSize: '24px',
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    width: '51%',
    margin: '-55px 3% -3px',
    height:' 90px',
    padding: '14px 0'
    
  },
  mainTmp: {
    fontSize: '220%',
    position: 'absolute',
    margin: '-170px 121px'
  },
  tempMinMax: {

  }
});
