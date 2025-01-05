import { Container, Row, Col } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function Login(props: {setName: (name: string) => void}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    var [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // React Router's navigate hook
    if (location.state) {
        errorMessage = location.state?.errorMessage;
    }
    
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            credentials: 'include', // to get cookies
            body: JSON.stringify({
                name,
                password,
            })
        });

        const content = await response.json();

        if (response.ok) {
            props.setName(content.name);
            localStorage.setItem("name", content.name);
            navigate('/', {replace: true});
        } else {
            setErrorMessage(content.message || "An error has occurred, please try again")
        }
    }

    return  (
        <Container className="mt-4">
        <Row>
            <Col></Col>
            <Col xs={6}>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                    <input type="text" className="form-control mb-3" placeholder="Username" required 
                            onChange={e => setName(e.target.value)}
                    />
                    <input type="password" className="form-control mb-3" placeholder="Password" required 
                            onChange={e => setPassword(e.target.value)}
                    />
                    {errorMessage && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </Col>
            <Col></Col>
        </Row>
        </Container>
    )
}
