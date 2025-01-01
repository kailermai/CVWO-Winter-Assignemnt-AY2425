import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Threads() {
    const [posts, setPosts] = useState<any[]>([]);
    var [errorMessage, setErrorMessage] = useState("");

    // Fetch posts from the API
    useEffect(() => {
        axios.get("http://localhost:8000/api/posts")
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setPosts(res.data);
                } else {
                    console.warn("No posts found.");
                    setErrorMessage("No posts found.")
                }
            })
            .catch(err => console.error("Error fetching posts:", err));
    }, []);

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1 className="mb-4">Threads</h1>
                </Col>
                <Col style={{
                        display:'flex', 
                        justifyContent: 'right',
                        height: '3em',
                }}>
                    
                    <Link to={"/create"} style={{
                            color: 'white',
                            textDecoration: 'none',
                        }}>
                        <Button>
                            Create Post +
                        </Button>
                    </Link>
                </Col>
            </Row>
            
            
            {errorMessage && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {errorMessage}
                        </div>
            )}
            <Row xs={1} md={2} lg={3} className="g-4">
                {posts.map(post => (
                    <Col key={post.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.Title}</Card.Title>
                                <Card.Text>
                                    {post.Body}
                                </Card.Text>
                                <footer className="blockquote-footer">
                                    Posted by {post.User || "Anonymous"}
                                </footer>
                                <Button 
                                    variant="primary" 
                                    className="mt-3"
                                    onClick={() => console.log(`Viewing post ${post.id}`)}
                                >
                                    View Post
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}