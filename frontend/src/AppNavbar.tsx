import {Container} from 'reactstrap';
import Logout from "./Logout";
import {Navbar, Nav} from 'react-bootstrap';

const AppNavbar = (props: {isLoggedIn: boolean}) => {
    const isLoggedIn = props.isLoggedIn;

    return (
        <Navbar bg="dark" expand="lg">
        <Container>
            <Navbar.Brand href="/">Scrape it!</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            {isLoggedIn === true &&
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/scrapeit/text">Text</Nav.Link>
                    <Nav.Link href="/scrapeit/header">Header</Nav.Link>
                    <Logout />
                </Nav>
            }
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default AppNavbar;