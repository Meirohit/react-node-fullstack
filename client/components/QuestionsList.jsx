import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { ArrowRightSquare, Trash } from "react-bootstrap-icons"
import { Question } from '../../server/models/Question';

function QuestionsList() {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newText, setNewText] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newDate, setNewDate] = useState('')

    const fetchQuestions = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch('http://localhost:3000/api/questions');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setQuestions(data);
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const onDeleteAction = () => {
        fetchQuestions();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const question = new Question(undefined, newText, newAuthor, newDate)
        addQuestion(question)
        setNewText('')
        setNewAuthor('')
        setNewDate('')
    }

    const addQuestion = async (question) => {
        let question_post = { text: question.text, author: question.author, date: question.date }
        try {
            const response = await fetch('http://localhost:3000/api/questions', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(question_post)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            onNewQuestionCreation()

        } catch (error) {
            console.error("Failed to create new question: ", error)
        }
    }

    const onNewQuestionCreation = () => {
        fetchQuestions();
    }

    return (
        <>
            {isLoading && <p>Loading questions...</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            {!isLoading && !error && questions.length === 0 && (
                <p>No questions available. Add one below!</p>
            )}
            {!isLoading && !error && questions.length > 0 && (<Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map(q => <QuestionRow key={q.questionId} question={q} onDeleteAction={onDeleteAction} />)}
                </tbody>
            </Table>)}
            {!isLoading && !error && (<>
                <h4>Add new question</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label> Text of the question </Form.Label>
                        <Form.Control type='text' name='text' value={newText} onChange={(e) => setNewText(e.target.value)}></Form.Control>
                    </Form.Group><Form.Group>
                        <Form.Label> Asked by </Form.Label>
                        <Form.Control type='text' name='author' value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)}></Form.Control>
                    </Form.Group><Form.Group>
                        <Form.Label> Date </Form.Label>
                        <Form.Control type='text' name='date' value={newDate} onChange={(e) => setNewDate(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className="mt-3">Save</Button>

                </Form>
            </>
            )}
        </>
    );
}

function QuestionRow(props) {
    const question = props.question;

    const navigate = useNavigate()
    const navToQuestionPage = (questionId) => {
        navigate(`/questions/${questionId}`, { state: { qid: questionId } })
    }

    const handleDelete = async (questionId) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                const response = await fetch(`http://localhost:3000/api/questions/${questionId}`,
                    {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' }
                    }
                );
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                props.onDeleteAction();
            } catch (error) {
                console.error('Failed to delete question:', error);
            }
        }
    }


    return <tr>
        <td>{question.questionId}</td>
        <td>{question.text}</td>
        <td>{question.author}</td>
        <td>{question.date}</td>
        <td>
            <ArrowRightSquare
                onClick={() => navToQuestionPage(question.questionId)}
                style={{ cursor: 'pointer', marginRight: '10px' }} />
            <Trash
                onClick={() => handleDelete(question.questionId)}
                style={{ cursor: 'pointer', color: 'red' }} />
        </td>
    </tr>
}

export default QuestionsList;
