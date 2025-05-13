import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function QuestionsList() {

    const questionId = 1

    const navigate = useNavigate()
    const navToQuestionPage = () => {
        navigate(`/questions/${questionId}`, {state: {qid: questionId} })
    }
    return (
    <>
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Asked by</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                </tr>
            </tbody>
        </Table>
        <Button onClick={() => navToQuestionPage()}>Add question</Button>
    </>
    );
}
export default QuestionsList;
