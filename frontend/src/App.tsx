import './style/App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
                    <Route exact path='/'       component={Home}/>
                    <Route exact path='/login'  component={Login}/>
                    <Route exact path='/signup' component={SignUp}/>
                    <Redirect to='/'/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;