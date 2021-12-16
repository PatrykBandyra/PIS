import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    msg: ""
  };

  async componentDidMount() {
    const response = await fetch('/api/hello');
    const body = await response.text();
    this.setState({msg: body});
  }

  render() {
    const {msg} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <div key={msg}>
                {msg}
              </div>
            </div>
          </header>
        </div>
    );
  }
}
export default App;