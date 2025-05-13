import { useLocation } from "react-router"

function QuestionPage() {

    const location = useLocation();
    const qid = location.state.qid;

    return <>
        <p>Question id {qid}</p>
    </>
}

export default QuestionPage