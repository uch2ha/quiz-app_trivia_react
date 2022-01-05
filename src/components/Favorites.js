import { Button } from "@material-ui/core";
import { useEffect, useState, useRef  } from "react";
import ReactToPrint from "react-to-print";

import Card from "./Card";


const Favorites = () => {
  let componentRef = useRef()
  const [datas, setDatas] = useState([])

  useEffect(() => setDatas(JSON.parse(sessionStorage.getItem("favorites"))), []);
  
  console.log(datas)

  return(
    // style={{display: "flex", flexWrap: "wrap"}}
    <div >
      {/* button to trigger printing of target component */}
      <ReactToPrint
          trigger={() => <Button>Print this out!</Button>}
          content={() => componentRef}
      />

      <div ref={(el) => (componentRef = el)}>
      {datas ? (
        <>
          {datas.map((data)=>(
            <Card >
              <h2 >{data.question}</h2>
              <div>
                <h3>correct answer</h3>
                <label dangerouslySetInnerHTML={{__html: data.correct_answer}} />
              </div>
              {data.incorrect_answers.map((incorrect_answer)=>(
                <label dangerouslySetInnerHTML={{__html: incorrect_answer}} />
              ))}
            </Card>
          ))}
        </>
      ) : (<div>Loading...</div>)}
      </div>
    </div>
  )
}

export default Favorites;