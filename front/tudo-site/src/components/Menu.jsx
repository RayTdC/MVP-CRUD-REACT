import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'


function Menu() {

    return (<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
        <Container>
            <LinkContainer to="/">
                <Navbar.Brand>𝓜𝓸𝓭𝓪 & 𝓜𝓪𝓰𝓲𝓪</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/">
                        <Nav.Link>𝓗𝓸𝓶𝓮</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/sobre">
                        <Nav.Link>𝓢𝓸𝓫𝓻𝓮</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/funcionalidades">
                        <Nav.Link>𝓐𝓵𝓰𝓾𝓷𝓼 𝓯𝓮𝓲𝓽𝓸𝓼</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/contato">
                        <Nav.Link>𝓒𝓸𝓷𝓽𝓪𝓽𝓸</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>)
}

export default Menu;

