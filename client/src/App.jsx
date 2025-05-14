import { useEffect, useState } from 'react'
import './App.css'
import Header from '../components/Header';
import { Route, Routes } from 'react-router';
import HomePage from '../components/QuestionsList';
import QuestionPage from '../components/QuestionPage';

function App() {

  // const [msg, setMsg] = useState('');

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
