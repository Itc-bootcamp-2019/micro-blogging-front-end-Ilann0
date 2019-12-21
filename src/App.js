import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import './App.css';

import TweetManager from "./pages/TweetManager";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from './pages/Login';

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
                      <Route exact path="/login">
                          <Login />
                      </Route>
                  </Switch>
              </section>
          </Router>
      </div>
  );
}

export default App;
