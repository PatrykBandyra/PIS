import './style/App.css';
// import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Scrape from './Scrape';
import GetHeader from "./GetHeader";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import React from "react";

// If the type is unknown at the moment use this:
// export type FixMeLater = any

const App = () => {
    return (
        <div>
            <ToastContainer
                containerId="toast"
                draggable={true}
                draggablePercent={20}
                position="top-right"
                autoClose={5000}
                pauseOnHover={true}
                hideProgressBar={false}
                newestOnTop={true}
            />
            <Router>
                  <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/login' exact={true} component={Login}/>
                        <Route path='/signup' component={SignUp}/>
                        <Route path='/scrapeit/text' exact={true} component={Scrape}/>
                        <Route path='/scrapeit/header' component={GetHeader}/>
                  </Switch>
            </Router>
        </div>
    )
}

export default App;