import './style/App.css';
// import logo from './logo.svg';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';
import {useHistory} from "react-router-dom";
import {useState} from "react";
import Scrape from "./Scrape";

const Home = () => {
    const history = useHistory()

    const [action, setAction] = useState('scraper');

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
            <AppNavbar setAction={setAction} isLoggedIn={true}/>
            <Container fluid>
                <div className="App">
                    {action === 'scraper' &&
                        <Scrape/>
                    }
                </div>
            </Container>
        </div>
    );
}
export default Home;