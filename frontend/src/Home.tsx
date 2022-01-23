import './style/App.css';
// import logo from './logo.svg';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';
import {useHistory} from "react-router-dom";

const Home = () => {
    const history = useHistory()

    const authenticateUser = () => {
        fetch('api/user', {
            method: 'GET'
        })
            .then(response => {
                if(!response.ok) history.push("/login");
            })
    }

    authenticateUser();

    return (
        <div>
            <AppNavbar isLoggedIn={true}/>
            <Container fluid>
                <div className="App">
                    <h1>Test</h1>
                </div>
            </Container>
        </div>
    );
}
export default Home;