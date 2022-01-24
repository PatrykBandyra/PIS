import {Container, Navbar, Nav, NavLink, NavbarBrand} from 'reactstrap';
import Logout from "./Logout";
import React from 'react';

const AppNavbar = ({setAction = undefined, isLoggedIn = false}: {setAction?: React.Dispatch<React.SetStateAction<string>>; isLoggedIn?: boolean}) => {
    // const isLoggedIn = props.isLoggedIn;
    // const setAction = props.setAction;
    return (
        <Navbar bg="dark" expand="lg">
        <Container>
            <NavbarBrand className='text-light fw-bold' href="/">Scrape it!</NavbarBrand>
            {isLoggedIn && setAction !== undefined &&
                <Nav className="me-auto">
                    <NavLink className='btn btn-outline-dark text-light fw-bold' href="#" onClick={() => setAction('scraper')}>Scraper</NavLink>
                    <Logout />
                </Nav>
            }
        </Container>
        </Navbar>
    )
}

export default AppNavbar;