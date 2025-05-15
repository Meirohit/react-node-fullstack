import { useEffect } from "react";
import { useState } from "react";
import { Alert, Card, Container, ListGroup, Spinner } from "react-bootstrap";
import { useLocation } from "react-router"

function QuestionPage() {
    const location = useLocation();
    const question = location.state.question;
    const qid = question.id;

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    const [answers, setAnswers] = useState([])

    const getAnswers = async (id) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(`http://localhost:3000/api/questions/${id}/answers`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const answers = await response.json()
            setAnswers(answers)
        } catch (error) {
            console.log(`Failed to get the question: ${error}`)
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAnswers(qid)
    }, [])

    return <Container className="my-4">
        <Card>
            <Card.Body>
                {isLoading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}
                {!isLoading && !error && question === null && (
                    <Alert variant="info">Question is not available?!</Alert>
                )}
                {!isLoading && !error && answers != null && (
                    <>
                        <Card.Header as="h5">Answers for the question: <strong>{question.text}</strong></Card.Header>
                        <ListGroup as="ol" numbered>
                            {answers.map(ans => <ListGroup.Item as="li" key={ans.id}>{ans.text}</ListGroup.Item>)}
                        </ListGroup>
                    </>
                )}
                {!isLoading && !error && answers.length === 0 && (
                    <Alert variant="info">No answers for now.</Alert>
                )}
            </Card.Body>
        </Card>
    </Container>
}

export default QuestionPage