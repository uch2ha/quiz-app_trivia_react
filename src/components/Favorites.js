import { Button } from "@material-ui/core";
import { useEffect, useState, useRef  } from "react";
import { v4 as uuidv4 } from 'uuid';
import ReactToPrint from "react-to-print";
import PrintIcon from '@material-ui/icons/Print';
import CachedIcon from '@material-ui/icons/Cached';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Card from "./Card";
import { useHistory } from "react-router-dom";


const Favorites = () => {
  let componentRef = useRef()
  const history = useHistory();
  const [favData, setFavData] = useState([])
  const [fontSize, setFontSize] = useState("0.725rem")
  const [favCounter, setFavCounter] = useState(0)

  useEffect(() => {
    const favorites = JSON.parse(sessionStorage.getItem("favorites"))
    if(favorites){
      setFavData(favorites);
      setFavCounter(favorites.length)
    }
  }, []);

  const clearFavorites = () => {
    if (window.confirm("Do you want to delete ALL questions?")) {
      if(window.confirm("Are you sure?")){
        sessionStorage.clear();
        history.push("/")
      }
    }
  }

  const deleteDuplicates = () => {
    let favArray = favData

    if(favData){
      for(let i=0; i < favArray.length; i++){
        let counter = 1
        while((i+counter) !== favArray.length){
          if(favArray[i].question === favArray[i+counter].question){
            const index = favArray.indexOf(favArray[i])
            if (index > -1) {
              favArray.splice(index, 1);
            }
          }else{
            counter++
          }
        }
      }
      sessionStorage.setItem("favorites", JSON.stringify(favArray))
      window.location.reload()
    }
  }

  const handleInputChange = (event) =>{
    setFontSize(event.target.value)
  }

  const deleteQuestion = (question) =>{
    if (window.confirm("Do you want to delete THIS questions?")) {
      let favArray = favData

      for(let i=0; i < favArray.length; i++){
        if(favArray[i].question === question){
          const index = favArray.indexOf(favArray[i])
          if (index > -1) {
            favArray.splice(index, 1);
          }
        }
      }
      sessionStorage.setItem("favorites", JSON.stringify(favArray))
      window.location.reload()
    }

  }


  return(
    <div>
      <div style={{paddingBottom: "0.5rem"}} className="fav-tools">
        {/* fontSize  */}
        <select
          name="fontSize"
          style={{fontSize: "1.2rem", padding: "1rem", margin: "6px 8px", cursor: "pointer", width: "3.7rem",
            border: "2.5px solid #7428d1", borderRadius: "5px", background: "transparent"}}
          onChange={event => handleInputChange(event)}
          defaultValue={"0.725rem"}
        >
            
            <option value="0.900rem">+7</option>
            <option value="0.875rem">+6</option>
            <option value="0.850rem">+5</option>
            <option value="0.825rem">+4</option>
            <option value="0.800rem">+3</option>
            <option value="0.775rem">+2</option>
            <option value="0.750rem">+1</option>
            <option value="0.725rem">+0</option>
            <option value="0.700rem">-1</option>
            <option value="0.675rem">-2</option>
            <option value="0.650rem">-3</option>
            <option value="0.625rem">-4</option>
            <option value="0.600rem">-5</option>
            <option value="0.575rem">-6</option>
            <option value="0.550rem">-7</option>
            
        </select>
        {/* button to trigger printing of target component */}
        <ReactToPrint
            trigger={() => <Button>
              <PrintIcon style={{fontSize: "2rem", padding: "1rem", 
              border: "2.5px solid #7428d1", borderRadius: "5px"}}/>
            </Button>}
            content={() => componentRef}
        />
        <Button onClick={()=>deleteDuplicates()}>
              <CachedIcon style={{fontSize: "2rem", padding: "1rem", 
              border: "2.5px solid #7428d1", borderRadius: "5px"}}/>
        </Button>
        <Button onClick={()=>clearFavorites()}>
              <DeleteForeverIcon style={{fontSize: "2rem", padding: "1rem", 
              border: "2.5px solid #7428d1", borderRadius: "5px"}}/>
        </Button>
      </div>
      <div style={{paddingBottom: "0.5rem"}}>You have {favCounter} favorites</div>
      <div ref={(el) => (componentRef = el)}>
        {favData ? (
          <>
            {favData.map((data)=>(
              <Card key={uuidv4()} styles={{fontSize: fontSize }}>
                <div style={{position: "relative"}}>
                  <div>
                    <h2 dangerouslySetInnerHTML={{__html: data.question}} />
                    <div className="card-answers">
                      <div className="card-correct-answer">
                        <label dangerouslySetInnerHTML={{__html: data.correct_answer}} />
                      </div>
                      <div className="card-incorrect-answers">
                      {data.incorrect_answers.map((incorrect_answer)=>(
                        <label key={uuidv4()} dangerouslySetInnerHTML={{__html: incorrect_answer}} />
                      ))}
                      </div>
                    </div>
                  </div>
                  <div style={{position: "absolute", right: "0rem", top: "50%"}}>
                    <Button style={{padding: 0, fontSize: 20}} onClick={()=> deleteQuestion(data.question)}>
                      <p style={{fontSize: 10, margin: 0}}>x</p>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </>
        ) : (<div>No data</div>)}
      </div>
    </div>
  )
}

export default Favorites;