import './App.css'
import Header from './components/Header';
import { Route, Routes } from 'react-router';
import HomePage from './components/HomePage';
import QuestionPage from './components/QuestionPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<HomePage/>}/>
          <Route path='questions/:id' element={<QuestionPage />}/>
        </Route>
      </Routes>
    </>
  )
}



export default App
