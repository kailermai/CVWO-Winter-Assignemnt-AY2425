import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function Update(props: {name: string}) {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('General');
    const [body, setBody] = useState('');
    const [user, setUser] = useState(props.name);   
    const [post, setPost] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const postID = localStorage.getItem("postID");

        if (postID) {
            // Fetch the post by ID
            axios.get(`http://localhost:8000/api/posts/${postID}`)
                .then(res => {
                    // to set current post details
                    setPost(res.data);
                    setTitle(res.data.Title);
                    setTag(res.data.Tag);
                    setBody(res.data.Body);
                })
                .catch(err => {
                    setErrorMessage("Error fetching post.");
                    console.error("Error fetching post:", err);
                });
        } else {
            setErrorMessage("No post selected.");
            navigate('/threads');  // Redirect if no postID is found
        }
    }, [navigate]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        const response = await fetch(`http://localhost:8000/api/posts/${post.ID}`, {
            method: 'PUT',
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
            navigate('/view', {replace: true});
        } else {
            setErrorMessage(content.message || "An error has occurred, please try again");
        }

        
    }
    return (
        <Container className="mt-4">
            <h1 className="mb-4">Update Post</h1>
            {errorMessage && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {errorMessage}
                            </div>
            )}
            <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" autoComplete="off" value={title} placeholder="Enter title" onChange={e => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTag">
                    <Form.Label>Tag</Form.Label>
                    <Form.Select value={tag} onChange={e => setTag(e.target.value)}>
                        <option value="General">General</option>
                        <option value="Internship">Internship</option>
                        <option value="Misc">Misc</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicBody">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" autoComplete="off" rows={5} value={body} onChange={e => setBody(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUser">
                    <Form.Label>Username</Form.Label>
                    <Form.Control disabled readOnly type="text" value={props.name} onChange={e => setUser(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}