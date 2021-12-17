import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GetText from './GetText';
import GetHeader from "./GetHeader";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/scrapeit/text' exact={true} component={GetText}/>
            <Route path='/scrapeit/header' component={GetHeader}/>
          </Switch>
        </Router>
    )
  }
}

export default App;