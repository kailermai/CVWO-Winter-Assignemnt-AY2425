import { Card, CardBody, CardHeader, CardText, Container } from "react-bootstrap";

export function Home(props: { name: string }) {

    let welcome;

    if (props.name === undefined) {
        welcome = (
            <h1 className="mb-4">Welcome to Threadly!</h1>
        )
    } else {
        welcome = (
            <h1 className="mb-4">Welcome to Threadly, {props.name}!</h1>
        )
    }

    return (
        <Container className="mt-4">
            {welcome}
            Threadly is a platform for NUS computing students to connect, exchange ideas, ask questions and share opportunities.
            Be respectful and supportive!
            <Card className="mt-4">
                <CardHeader>
                    Announcements
                </CardHeader>
                <CardBody>
                    <CardText>There are no announcements currently.</CardText>
                </CardBody>
            </Card>
        </Container>
    );
};