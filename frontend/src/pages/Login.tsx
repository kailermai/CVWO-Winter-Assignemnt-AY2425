import { Container, Row, Col } from "react-bootstrap";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login(props: {setName: (name: string) => void}) {
    const [name, setName] = useState('');
    const navigate = useNavigate(); // React Router's navigate hook

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            credentials: 'include', // to get cookies
            body: JSON.stringify({
                name,
            })
        });

        const content = await response.json();
        

        navigate('/', {replace: true});
        props.setName(content.name);
    }

    return  (
        <Container className="mt-4">
        <Row>
            <Col></Col>
            <Col xs={6}>
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                    <input type="text" className="form-control mb-3" placeholder="Name" required 
                            onChange={e => setName(e.target.value)}
                    />
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </Col>
            <Col></Col>
        </Row>
        </Container>
    )
}
