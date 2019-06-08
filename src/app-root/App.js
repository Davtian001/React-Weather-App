import React, { Component } from 'react';
import './App.css';
import WeatherMain from '../weather/components/weather-main';
// import logo from './logo.svg';




class App extends Component {


  render() {
    return (
      <div className="App">
        <header className="App-header">
      <WeatherMain />

        </header>
      </div>
    );
  }
}

export default App;
