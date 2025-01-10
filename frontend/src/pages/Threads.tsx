import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export function Threads(props: { name: string }) {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("All");
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    // View post function
    const viewPost = (postID: string) => {
        // Store the postID in localStorage
        localStorage.setItem("postID", postID);

        // Navigate to the view post page
        navigate('/threads/view');
    };

    // Update post function
    const updatePost = (postID: string) => {
        // Store the postID in localStorage
        localStorage.setItem("postID", postID);

        // Navigate to the view post page
        navigate('/threads/update');
    };

    // Delete post function

    const deletePost = (postID: string) => {
        const confirmation = window.confirm("Do you want to delete your post?");
        if (confirmation) {
            axios.delete(`http://localhost:8000/api/posts/${postID}`)
                .then(() => {
                    alert('Record has been deleted!')
                    navigate(0); // refreshes the page
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
                    setFilteredPosts(res.data);
                } else {
                    console.warn("No posts found.");
                    setErrorMessage("No posts found.")
                }
            })
            .catch(err => console.error("Error fetching posts:", err));
    }, []);

    // filter posts based on tag using filter method
    useEffect(() => {
        if (selectedTag === "All") {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(posts.filter(post => post.Tag === selectedTag));
        }
    }, [selectedTag, posts]);

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

                    <Link to={"/threads/create"} style={{
                        color: 'white',
                        textDecoration: 'none',
                    }}>
                        <Button>
                            Create Post +
                        </Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Form.Group className="mb-3">
                    <Form.Label>Filter</Form.Label>
                    <Form.Select value={selectedTag} onChange={e => setSelectedTag(e.target.value)}>
                        <option value="All">All</option>
                        <option value="General">General</option>
                        <option value="Internship">Internship</option>
                        <option value="Misc">Misc</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            {errorMessage || filteredPosts.length === 0 && (
                <div className="alert alert-danger mt-3" role="alert">
                    {errorMessage || "No posts found."}
                </div>
            )}
            
            <Row xs={1} md={2} lg={3} className="g-4">
                {filteredPosts.map(post => (
                    <Col key={post.ID}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.Title}</Card.Title>
                                <Card.Text>Tags: {post.Tag}</Card.Text>
                                <Card.Text>
                                    <span style={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                        overflow: 'hidden',
                                    }}>
                                        {post.Body}
                                    </span>
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
                                            variant="secondary"
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