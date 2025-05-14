import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router"

function HomePage() {

    const location = useLocation();
    const qid = location.state.qid;

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState(null)

    const getQuestion = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:3000/api/questions/${id}`)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const question = await response.json()
            setQuestion(question)
        } catch (error) {
            console.log(`Failed to get the question: ${error}`)
            setError(error.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getQuestion(qid)
    }, [])

    return <>
        {isLoading && <p>Loading a question...</p>}
        {error && <p className="text-danger">Error: {error}</p>}
        {!isLoading && !error && question === null && (
            <p>No question available anymore.</p>
        )}
        {!isLoading && !error && question != null && <p>{question.text}</p>}
    </>
}

export default HomePage