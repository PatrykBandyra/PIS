import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

type State = {
    isOpen: boolean;
}

export default class AppNavbar extends Component<{}, State> {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Home</NavbarBrand>
            <NavbarBrand tag={Link} to="/scrapeit/text">Text</NavbarBrand>
            <NavbarBrand tag={Link} to="/scrapeit/header">Header</NavbarBrand>
        </Navbar>;
    }
}