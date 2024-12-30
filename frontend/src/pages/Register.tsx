import { SyntheticEvent, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Register() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                name,
            })
        });

        navigate('/login', {replace: true});
    }

    return  (
        <Container className="mt-4">
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <form onSubmit={submit}>
                        <h1 className="h3 mb-3 fw-normal">Register</h1>
                        <input type="text" className="form-control mb-3" placeholder="Name" required 
                            onChange={e => setName(e.target.value)}
                        />
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                    </form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}