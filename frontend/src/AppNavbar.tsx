import {Container, Navbar, Nav, NavLink, NavbarBrand} from 'reactstrap';
import Logout from "./Logout";

const AppNavbar = (props: {isLoggedIn: boolean}) => {
    const isLoggedIn = props.isLoggedIn;

    return (
        <Navbar bg="dark" expand="lg">
        <Container>
            <NavbarBrand href="/">Scrape it!</NavbarBrand>
            {isLoggedIn &&
                <Nav className="me-auto">
                    <NavLink href="/scraper">Scraper</NavLink>
                    <Logout />
                </Nav>
            }
        </Container>
        </Navbar>
    )
}

export default AppNavbar;