import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [question,setQuestion] = useState('');
  const [response,setResponse] = useState('');

  const submitHandler = (e)=>{
    e.preventDefault()
    console.log(question)
    axios.post('https://gemini-app-lime.vercel.app/getResponse',{
      question:question
    })
    .then((response) => {
      console.log(response.data.response);
      setResponse(response.data.response);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const speakHandler = ()=>{
    const a = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(a);
  }

  return (
    <div className="App">
      <div className='box'>
        <div className='profile-pic'>
          <img className='pic' src={require("./assets/users.png")} alt="Profile pic" />
        </div>
        <p className='lable'>users</p>
        <textarea placeholder='write your question' onChange={(e)=>{setQuestion(e.target.value)}}/>
        <button onClick={submitHandler}>Send</button>
      </div>
      <div className='box'>
        <div className='profile-pic'>
          <img className='pic' src={require("./assets/gemini.png")} alt="Profile pic" />
        </div>
        <p className='lable'>gemini model</p>
        <textarea value={response} />
        <button onClick={speakHandler}>speak</button>
      </div>
    </div>
  );
}

export default App;
