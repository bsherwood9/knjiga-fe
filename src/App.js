import BookBrowser from "./components/BookBrowse.js";
import BookClub from "./components/BookClub.js";
import Navigation from "./components/Navigation";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div>
          <Navigation />
        </div>
      </div>
      <Switch>
        <Route path="/browse">
          <BookBrowser />
        </Route>
        <Route path="/bookclub">
          <BookClub />
        </Route>
        <Route path="/">
          <h1>Welcome Loves</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
