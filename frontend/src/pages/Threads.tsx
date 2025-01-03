import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function Threads(props: { name: string }) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);
    var [errorMessage, setErrorMessage] = useState("");

    // View post function
    const viewPost = (postID: string) => {
        // Store the postID in localStorage
        localStorage.setItem("postID", postID);

        // Navigate to the view post page
        navigate('/view', { replace: true });
    };

    // Update post function
    const updatePost = (postID: string) => {
        // Store the postID in localStorage
        localStorage.setItem("postID", postID);

        // Navigate to the view post page
        navigate('/update', { replace: true });
    };

    // Delete post function

    const deletePost = (postID: string) => {
        const confirmation = window.confirm("Do you want to delete your post?");
        if (confirmation) {
            axios.delete(`http://localhost:8000/api/posts/${postID}`)
            .then( () => {
                alert('Record has been deleted!')
                navigate(0);
            })
            .catch(err => {
                setErrorMessage("Error deleting post.");
                console.error("Error deleting post:", err);
            });
        }
    }

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
                    display: 'flex',
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
                    <Col key={post.ID}>
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
                                    className="mt-3 me-3"
                                    onClick={() => viewPost(post.ID)}

                                >
                                    View
                                </Button>
                                {post.User === props.name && (
                                    <>
                                        <Button
                                            variant="info"
                                            className="mt-3 me-3"
                                            onClick={() => updatePost(post.ID)}

                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="mt-3"
                                            onClick={() => deletePost(post.ID)}

                                        >
                                            Delete
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}