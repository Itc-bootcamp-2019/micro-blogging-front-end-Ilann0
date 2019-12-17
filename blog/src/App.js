import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import './App.css';

import TweetManager from "./components/TweetManager";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";

function App() {
  return (
      <div className="App">
          <Router>
              <Navbar />
              <section className="content-main-container">
                  <Switch>
                      <Route exact path="/">
                          <TweetManager />
                      </Route>
                      <Route exact path="/profile">
                          <Profile />
                      </Route>
                  </Switch>
              </section>
          </Router>
      </div>
  );
}

export default App;
