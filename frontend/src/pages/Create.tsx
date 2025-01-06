import { SyntheticEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Create(props: {name: string}) {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('General');
    const [body, setBody] = useState('');
    const [user] = useState(props.name);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const response = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                title,
                tag,
                body,
                user,
            })
        });

        const content = await response.json();

        if (response.ok) {
            // means that there is no existing user
            navigate('/threads', {replace: true});
        } else {
            setErrorMessage(content.message || "An error has occurred, please try again");
        }

        
    }

    return (
        <Container className="mt-4">
            <h1 className="mb-4">Create Post</h1>
            {errorMessage && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {errorMessage}
                            </div>
            )}
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" required autoComplete="off" placeholder="Enter title" onChange={e => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTag">
                    <Form.Label>Tag</Form.Label>
                    <Form.Select onChange={e => setTag(e.target.value)}>
                        <option value="General">General</option>
                        <option value="Internship">Internship</option>
                        <option value="Misc">Misc</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicBody">
                    <Form.Label>Content</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        required 
                        autoComplete="off" 
                        rows={5} 
                        maxLength={1000}
                        onChange={e => setBody(e.target.value)}/>
                    <Form.Text className="text-muted">
                        {1000 - (body.length || 0)} characters remaining.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}