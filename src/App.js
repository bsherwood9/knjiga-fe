import React from "react";
import BookBrowser from "./components/BookBrowse.js";
import BookClub from "./components/BookClub.js";
import Navigation from "./components/Navigation";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookShelfPage from "./components/BookShelfPage.js";

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
        <Route path="/myshelves">
          <BookShelfPage />
        </Route>
        <Route path="/">
          <h1>Welcome Loves</h1>
          <Register />
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
