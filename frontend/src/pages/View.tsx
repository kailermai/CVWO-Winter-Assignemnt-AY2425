import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardText, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function View() {
    const [post, setPost] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const postID = localStorage.getItem("postID");

        if (postID) {
            // Fetch the post by ID
            axios.get(`http://localhost:8000/api/posts/${postID}`)
                .then(res => {
                    setPost(res.data);
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

    return (
        <Container>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {post && (
                <>
                    <Card className="mb-3">
                        <CardHeader>{post.Title}</CardHeader>
                        <CardBody>
                            <CardText>Posted on 29 Dec by {post.User || "Anonymous"}</CardText>
                            <blockquote className="blockquote mb-0">
                                <p>{post.Body}</p>
                            </blockquote>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Comments</CardHeader>
                    </Card>
                </>
            )}
        </Container>
    );
}