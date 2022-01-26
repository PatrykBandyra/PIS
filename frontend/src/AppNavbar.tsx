// @ts-ignore
import React from 'react';
import {Container, Navbar, Nav, NavLink, NavbarBrand, DropdownMenu, DropdownItem, DropdownToggle, Dropdown} from 'reactstrap';
import Logout from "./Logout";
import {useState} from "react";

const AppNavbar = ({setAction = undefined, isLoggedIn = false}: {setAction?: React.Dispatch<React.SetStateAction<string>>; isLoggedIn?: boolean}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    }

    return (
        <Navbar className='bg-dark' expand="lg">
        <Container>
            <NavbarBrand className='text-light fw-bold' href="/">Scrape it!</NavbarBrand>
            {isLoggedIn && setAction !== undefined &&
                <Nav className="me-auto">
                    <NavLink
                        className='btn btn-outline-dark text-light fw-bold'
                        href="#"
                        onClick={() => setAction('scraper')}>
                        Scraper
                    </NavLink>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret className='bg-dark'>
                            Scheduling
                        </DropdownToggle>
                        <DropdownMenu className='bg-dark'>
                            <DropdownItem
                                className='btn btn-outline-dark text-light fw-bold'
                                href="#"
                                onClick={() => setAction('tasks')}>
                                My tasks
                            </DropdownItem>
                            <DropdownItem
                                className='btn btn-outline-dark text-light fw-bold bg-dark'
                                href="#"
                                onClick={() => setAction('newTask')}>
                                ⊕ New task
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Logout />
                </Nav>
            }
        </Container>
        </Navbar>
    )
}

export default AppNavbar;