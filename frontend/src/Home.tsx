import './style/App.css';
// import logo from './logo.svg';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';
import { useHistory } from "react-router-dom";
import {toast} from "react-toastify";

const Home = () => {
    let history = useHistory();

    const getUser = () => {
        fetch('api/user', {
            method: 'GET'
        })
        .then(response => {
            if(!response.ok) history.push("/login");
        })
    }

    getUser();

    return (
        <div>
            <AppNavbar isLoggedIn={true}/>
            <Container fluid>
                <div className="App">
                </div>
            </Container>
        </div>
    );
}
export default Home;