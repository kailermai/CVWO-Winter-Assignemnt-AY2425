import { Button, Container, Image, Nav, Navbar as NavbarBS } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export function Navbar(props: {name: string, setName: (name: string) => void}) {
    const logout = async () => {
        await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            credentials: 'include', // to get cookies
        });
        
        props.setName('');
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
            <Button style={{width: "3rem", height: "3rem"}}
                    variant="outline-primary"
                    className="rounded-circle"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="50 60 100 100"
                >
                    <path fill="#282828" d="M135.832 140.848h-70.9c-2.9 0-5.6-1.6-7.4-4.5-1.4-2.3-1.4-5.7 
                                            0-8.6l4-8.2c2.8-5.6 9.7-9.1 14.9-9.5 1.7-.1 5.1-.8 8.5-1.6 2.5-.6 
                                            3.9-1 4.7-1.3-.2-.7-.6-1.5-1.1-2.2-6-4.7-9.6-12.6-9.6-21.1 0-14 
                                            9.6-25.3 21.5-25.3s21.5 11.4 21.5 25.3c0 8.5-3.6 16.4-9.6 
                                            21.1-.5.7-.9 1.4-1.1 2.1.8.3 2.2.7 4.6 1.3 3 .7 6.6 1.3 8.4 1.5 
                                            5.3.5 12.1 3.8 14.9 9.4l3.9 7.9c1.5 3 1.5 6.8 0 9.1-1.6 2.9-4.4 
                                            4.6-7.2 4.6zm-35.4-78.2c-9.7 0-17.5 9.6-17.5 21.3 0 7.4 3.1 14.1 
                                            8.2 18.1.1.1.3.2.4.4 1.4 1.8 2.2 3.8 2.2 5.9 0 .6-.2 1.2-.7 
                                            1.6-.4.3-1.4 1.2-7.2 2.6-2.7.6-6.8 1.4-9.1 1.6-4.1.4-9.6 3.2-11.6 
                                            7.3l-3.9 8.2c-.8 1.7-.9 3.7-.2 4.8.8 1.3 2.3 2.6 4 2.6h70.9c1.7 0 
                                            3.2-1.3 4-2.6.6-1 
                                            .7-3.4-.2-5.2l-3.9-7.9c-2-4-7.5-6.8-11.6-7.2-2-.2-5.8-.8-9-1.6-5.8-1.4-6.8-2.3-7.2-2.5-.4-.4-.7-1-.7-1.6 0-2.1.8-4.1 2.2-5.9.1-.1.2-.3.4-.4 5.1-3.9 8.2-10.7 8.2-18-.2-11.9-8-21.5-17.7-21.5z" />
                </svg>
            </Button>
        </Container>
    </NavbarBS>
}