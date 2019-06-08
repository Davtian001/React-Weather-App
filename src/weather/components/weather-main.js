import React, { Component, Fragment } from 'react';
import WeatherService from '../weather-service';
import WeatherBoxItem from './weather-box-item';
import shortid from 'shortid';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WeatherDetailsTable from './weather-detail';
import ChartGraph from './wearher-graph';


export const WaetherMainContext = React.createContext();

class WeatherMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      selectedIndex: 0,
    }

    this.days = []
    this.weatherService = new WeatherService();
  }

  componentDidMount() {
    this.weatherService.toDivideWithDays().then(weatherData =>
      this.setState({ weatherData }));
  }


  render() {
    const stateWeatherData = this.state.weatherData;
    const shortId = shortid.generate;


    return (
      <WaetherMainContext.Provider value={{
        mainStateWeatherData: stateWeatherData,
        selectedIndex: this.state.selectedIndex,
      }}>
        <Fragment>
          <Router>
            <Switch>
              <Route path="/:day" component={WeatherDetailsTable} />
            </Switch>

            {stateWeatherData &&
              stateWeatherData.list.map((weatherDataListItem, ind) => {

                return (
                  <WeatherBoxItem
                    key={shortId()}
                    weatherListItem={weatherDataListItem}
                    city={stateWeatherData.city}
                    maxMinTemp={stateWeatherData.dayMaxAndMinTemp[ind]}
                    maxMinHum={stateWeatherData.dayMaxAndMinHum[ind]}
                    posInd={ind}
                  />)
              })}
            {stateWeatherData &&
             <ChartGraph stateWeatherData={stateWeatherData} />}
            
          </Router>
        </Fragment>
      </WaetherMainContext.Provider>

    );
  }
}

export default WeatherMain;