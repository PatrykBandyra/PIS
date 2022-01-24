import './style/App.css';
// import logo from './logo.svg';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap';
import {useHistory} from "react-router-dom";
import {useState, useEffect} from "react";
import Scrape from "./Scrape";
import TaskList from "./TaskList";

const Home = () => {
    const history = useHistory()

    const [action, setAction] = useState('scraper');

    const authenticateUser = () => {
        fetch('api/user', {
            method: 'GET'
        })
            .then(response => {
                console.log('checked')
                if(!response.ok) history.push("/login");
            })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            authenticateUser();
        }, 5000);
    })

    return (
        <div>
            <AppNavbar setAction={setAction} isLoggedIn={true}/>
            <Container fluid className='p-0'>
                <div className='w-auto p-4 bg-dark'></div>
                <div className="w-auto p-0">
                    {action === 'scraper' &&
                        <Scrape/>
                    }
                    {action === 'tasks' &&
                        <TaskList/>
                    }
                </div>
            </Container>
        </div>
    );
}
export default Home;