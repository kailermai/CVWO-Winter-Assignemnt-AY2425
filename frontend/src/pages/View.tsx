import axios from "axios";
import { Key, ReactNode, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardText, CardTitle, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function View() {
    const [post, setPost] = useState<any>(null);
    const [comments, setComments] = useState<any>(null);
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
                        {comments && comments.map((comment: {User: string; ID: Key; Body: ReactNode }) => (
                            <Card key={comment.ID}>
                                <CardBody>
                                    <CardTitle>
                                        {comment.User || "Anonymous"}
                                    </CardTitle>
                                    <CardText>{comment.Body}</CardText>
                                </CardBody>
                            </Card>
                        ))}
                    </Card>

                </>
            )}
        </Container>
    );
}