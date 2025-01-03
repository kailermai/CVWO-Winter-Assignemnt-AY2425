import { Container, Image, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export function Navbar(props: {name: string, setName: (name: string) => void}) {
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            credentials: 'include', // to get cookies
        });
        
        props.setName('');
        localStorage.removeItem("name");
        localStorage.removeItem("postID");

    }

    let menu;

    if (props.name === undefined) {
        menu = (
            <Nav className="me-2">
                <Nav.Link to="/login" as={NavLink}>
                    Login
                </Nav.Link>
                <Nav.Link to="/register" as={NavLink}>
                    Register
                </Nav.Link>
            </Nav>
        )
    } else {
        menu = (
            <Nav className="me-2">
                <Nav.Link to="/login" as={NavLink} onClick={logout}>
                    Logout
                </Nav.Link>
            </Nav>
        )
    }

    return <NavbarBS sticky="top" className="bg-white shadow-sm mb-3">
        <Container>
            <Image src="public/Threadly-.png" roundedCircle style={{width: "3rem", height: "3rem", marginRight:"1rem"}} />
            <Nav className="me-auto">
                <Nav.Link to="/" as={NavLink}>
                    Home
                </Nav.Link>
                <Nav.Link to="/threads" as={NavLink}>
                    Threads
                </Nav.Link>
            </Nav>
            {menu}
        </Container>
    </NavbarBS>
}