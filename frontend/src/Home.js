import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="App">
                        <header className="App-header">
                            <img src={logo} className="App-logo" alt="logo" />
                            {/* <div className="App-intro">
                                <div key={msg}>
                                    {msg}
                                </div>
                            </div> */}
                        </header>
                    </div>
                </Container>
            </div>
        );
    }
}
export default Home;