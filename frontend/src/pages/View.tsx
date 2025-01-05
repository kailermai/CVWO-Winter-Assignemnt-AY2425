import axios from "axios";
import { Key, ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function View(props: { name: string }) {
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any>(null);
    const [body, setBody] = useState('');
    const [postid, setPostid] = useState('');
    const [user] = useState(props.name);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    // Fetch post
    useEffect(() => {
        const postID = localStorage.getItem("postID");

        if (postID) {
            // Fetch the post by ID
            axios.get(`http://localhost:8000/api/posts/${postID}`)
                .then(res => {
                    setPost(res.data);
                    setPostid(postID);
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

    // Fetch comments from the API
    useEffect(() => {
        const postID = localStorage.getItem("postID");

        if (postID) {
            axios.get(`http://localhost:8000/api/comments/${postID}`)
                .then(res => {
                    if (res.data && res.data.length > 0) {
                        setComments(res.data);
                    } else {
                        console.warn("No comments found.");
                        setErrorMessage("No comments found.")
                    }
                })
                .catch(err => console.error("Error fetching comments:", err));
        }
    }, []);

    // Submit commnet button
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/comments', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                body,
                user,
                postid,
            })
        });

        const content = await response.json();

        if (response.ok) {
            // means that there is no existing user
            navigate(0);
        } else {
            setErrorMessage(content.message || "An error has occurred, please try again");
        }


    }

    return (
        <Container>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {post && (
                <>
                    <Card className="mb-3 mt-3">
                        <CardHeader>{post.Title}</CardHeader>
                        <CardBody>
                            <CardText>Posted on {new Date(post.CreatedAt).toLocaleDateString()} by {post.User || "Anonymous"}</CardText>
                            <blockquote className="blockquote mb-0">
                                <p>{post.Body}</p>
                            </blockquote>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: '3em',
                                }}>
                                    Comments
                                </Col>
                            </Row>
                        </CardHeader>
                        <Card>
                            {comments && comments.map((comment: { User: string; ID: Key; Body: ReactNode }) => (
                                <CardBody key={comment.ID}>
                                    <Row>
                                        <Col>
                                            <CardTitle>
                                                {comment.User || "Anonymous"}
                                            </CardTitle>
                                        </Col>
                                        <Col style={{
                                            display: 'flex',
                                            justifyContent: 'right',
                                        }}>
                                            <CardText>
                                                {new Date(post.CreatedAt).toLocaleDateString()}
                                            </CardText>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <CardText>{comment.Body}</CardText>
                                        </Col>
                                        <Col style={{
                                            display: 'flex',
                                            justifyContent: 'right',
                                        }}>
                                            <Link to={"/edit"} style={{
                                                color: 'grey',
                                                textDecoration: 'none',
                                            }}>
                                                <CardText className="me-2">Edit</CardText>
                                            </Link>
                                            <Link to={"/"} style={{
                                                color: 'grey',
                                                textDecoration: 'none',
                                            }}>
                                                <CardText>Delete</CardText>
                                            </Link>
                                        </Col>
                                    </Row>
                                </CardBody>
                            ))}
                            <Card></Card>
                            <CardBody>
                                <Form onSubmit={submit}>
                                    <Form.Group className="mb-3" controlId="formBasicBody">
                                        <Form.Label>Add a comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            required
                                            autoComplete="off"
                                            rows={5}
                                            maxLength={500}
                                            onChange={e => setBody(e.target.value)} />
                                        <Form.Text className="text-muted">
                                            {500 - (body.length || 0)} characters remaining.
                                        </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Card>
                </>
            )}
        </Container>
    );
}