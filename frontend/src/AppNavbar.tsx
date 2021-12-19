import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {Navbar, Nav} from 'react-bootstrap';

type State = {
    isOpen: boolean;
}

export default class AppNavbar extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar bg="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">Scrape it!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/scrapeit/text">Text</Nav.Link>
                    <Nav.Link href="/scrapeit/header">Header</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
    }
}