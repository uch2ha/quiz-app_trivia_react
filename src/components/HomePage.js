import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Favorites from './Favorites';

const isFavorites = JSON.parse(sessionStorage.getItem("favorites"))

const HomePage = () => {
  const [data, setData] = useState([])
  const [tools, setTools] = useState({category: "9", difficult: "easy", type: "multiple"})
  const [favorites, setFavorites] = useState([])

  

  
  

  useEffect(() => getQuestions("https://opentdb.com/api.php?amount=1&category="
      +tools.category+"&difficulty="+tools.difficult+"&type="+tools.type),     
      []);

  const getQuestions = (API_URL) => {
      fetch(API_URL)
          .then(res => res.json())
          .then(data => {
            setData(data.results[0])
            if(isFavorites.length > 0){
              setFavorites(JSON.parse(sessionStorage.getItem("favorites")))
            }

          })
  }

  const handleInputChange = (event) =>{
    setTools({...tools, [event.target.name]: event.target.value })
  }

  const addToFavorites = () => {
    setFavorites([...favorites, {question: data.question,
      correct_answer: data.correct_answer,
      incorrect_answers: [data.incorrect_answers]}])
    
    sessionStorage.setItem("favorites", JSON.stringify(favorites))
 
  }

  const handleClick = () =>{
    getQuestions("https://opentdb.com/api.php?amount=1&category="
      +tools.category+"&difficulty="+tools.difficult+"&type="+tools.type)

    sessionStorage.setItem("favorites", JSON.stringify(favorites))
  }

  console.log(tools)
  console.log(data)
  console.log(favorites)
  // console.log(sessionStorage.getItem("favorites"))
  

  return(
    <div>
      <div className="tools">
        {/* category */}
        <select
          name="category"
          value={tools.category}
          style={{ padding: 5, marginRight: 20, marginBottom: 25 }}
          onChange={event => handleInputChange(event)}
        >
          <option value="9">General Knowledge</option>
              <option value="10">Entertainment: Books</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="13">Entertainment: Musicals & Theatres</option>
              <option value="14">Entertainment: Television</option>
              <option value="15">Entertainment: Video Games</option>
              <option value="16">Entertainment: Board Games</option>
              <option value="29">Entertainment: Comics</option>
              <option value="31">Entertainment: Japanese Anime & Manga</option>
              <option value="32">Entertainment: Cartoon & Animations</option>
              <option value="17">Science & Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Mathematics</option>
              <option value="30">Science: Gadgets</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
        </select>

        {/* difficult  */}
        <select
          name="difficult"
          value={tools.difficult}
          style={{ padding: 5, marginRight: 20, marginBottom: 25 }}
          onChange={event => handleInputChange(event)}
        >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>

        {/* type  */}
        <select
          name="type"
          value={tools.type}
          style={{ padding: 5, marginRight: 20, marginBottom: 25 }}
          onChange={event => handleInputChange(event)}
        >
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True/False</option>
        </select>
      </div>

      {data.category ? <>
        <div className="quiz">
          <h2 dangerouslySetInnerHTML={{__html: data.question}} />
            <div>
              <h3>Correct Answer:</h3>
                <li>
                    <label dangerouslySetInnerHTML={{__html: data.correct_answer}} />
                </li>
            </div>

            {data.incorrect_answers.map((incorrect_answer)=>(
              <li key={uuidv4()}>
                <label dangerouslySetInnerHTML={{__html: incorrect_answer}} />
              </li>
            ))}
            <Button onClick={() => addToFavorites() }>like</Button>
        </div>
        <Button onClick={() => handleClick()}>Reload</Button>
        
      </> : <div>Loading...</div>}
    </div>
  )
}

export default HomePage;