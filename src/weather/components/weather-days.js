import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { convertScale, dateAM } from '../pipes';


export default function WeatherDyas(props) {
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const { main, dt_txt, weather } =  props.weatherDaylistItem || {};
    return (
        // <Grid container className={classes.root} spacing={2}>
            <Grid item>
                <Paper className={classes.paper}>
                 <img className={classes.weatherIco} src={weather[0].icon}/>

                 <Typography variant="h6" >
                     <div className={classes.tempBlock}>
                    <span className={classes.tempScale}></span> 
                  <span className={classes.tempScale}>Temp: {convertScale('celcius', main.temp)}</span>
                  <span className={classes.tempScale}>Hum: { main.humidity}%</span>
                     </div>
                     <span className={classes.dateH}>{dateAM(dt_txt)}</span>
                </Typography>

                </Paper>
            </Grid>
        //  </Grid>
    );
}


const useStyles = makeStyles(theme => ({
    paper: {
        height: 140,
        width: 100,
        margin: '30px 0 0px '
    },
    tempScale: {
        display: 'flow-root',
        fontSize: '67%',
        fontStyle: 'oblique',
        fontFamily: 'inherit',
        fontWeight: '600',
    },
    weatherIco: {
        width: '71%',
        margin: '0% 13.6%',
    },
    tempBlock: {
        margin: '-6% 8px'
    },
    dateH: {
        margin: '0 32px',
        fontSize: '70%',
    }
}))