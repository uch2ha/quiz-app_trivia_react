import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Questions from "./components/Questions"
import Favorites from "./components/Favorites"
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Questions />
            </Route>
            <Route exact path="/favorites">
              <Favorites />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
