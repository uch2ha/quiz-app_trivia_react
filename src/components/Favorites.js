import { Button } from "@material-ui/core";
import { useEffect, useState, useRef  } from "react";
import ReactToPrint from "react-to-print";
import PrintIcon from '@material-ui/icons/Print';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Card from "./Card";
import { useHistory } from "react-router-dom";


const Favorites = () => {
  let componentRef = useRef()
  const history = useHistory();
  const [datas, setDatas] = useState([])

  useEffect(() => setDatas(JSON.parse(sessionStorage.getItem("favorites"))), []);

  const clearFavorites = () => {
    if (window.confirm("Are you sure?")) {
      sessionStorage.clear();
      history.push("/")
    }
  }
  

  return(
    // style={{display: "flex", flexWrap: "wrap"}}
    <div >
      {/* button to trigger printing of target component */}
      <ReactToPrint
          trigger={() => <Button>
            <PrintIcon style={{fontSize: "2rem", padding: "1.2rem", marginBottom: "1rem",
            border: "2.5px solid #7428d1", borderRadius: "5px"}}/>
          </Button>}
          content={() => componentRef}
      />
      <Button onClick={()=>clearFavorites()}>
            <DeleteForeverIcon style={{fontSize: "2rem", padding: "1.2rem", marginBottom: "1rem",
            border: "2.5px solid #7428d1", borderRadius: "5px"}}/>
      </Button>

      <div ref={(el) => (componentRef = el)}>
      {datas ? (
        <>
          {datas.map((data)=>(
            <Card>
              <h2 >{data.question}</h2>
              <div className="card-answers">
                <div className="card-correct-answer">
                  <label dangerouslySetInnerHTML={{__html: data.correct_answer}} />
                </div>
                <div className="card-incorrect-answers">
                {data.incorrect_answers.map((incorrect_answer)=>(
                  <label dangerouslySetInnerHTML={{__html: incorrect_answer}} />
                ))}
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