import { useEffect, useState } from 'react'
import './App.css'
import Header from '../components/Header';
import { Route, Routes } from 'react-router';
import QuestionsList from '../components/QuestionsList';
import QuestionPage from '../components/QuestionPage';

function App() {

  // const [msg, setMsg] = useState('');

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('http://localhost:3000');
  //     const data = await response.json()
  //     setMsg(data.message);
  //   }
  //   fetchData();
  // }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<QuestionsList/>}/>
          <Route path='questions/:id' element={<QuestionPage />}/>
        </Route>
      </Routes>
    </>
  )
}



export default App
