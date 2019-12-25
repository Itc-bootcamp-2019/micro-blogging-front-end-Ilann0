import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { subscribeAuth } from "./lib/firebase/auth/api";
import { subscribeUser } from "./lib/firebase/database/users";

import loader from './assets/Double Ring-1s-200px.gif';
import './App.css';

import RestrictedRoute from './components/App/RestrictedRoute'
import TweetManager from "./pages/TweetManager";
import Profile from "./pages/Profile";
import Navbar from "./components/App/Navbar";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';

function App() {
    const [ user, setUser ] = useState(null);
    const [ isPending, setPending ] = useState(true);

    let unsubscribeUser;
    function handleUserStateChange(user) {
        if (user) {
            unsubscribeUser = subscribeUser(user.uid, snapshot => {
                setUser({ ...snapshot.data() })
                setPending(false);
            })
        } else {
            setUser(null);
            setPending(false);
            if (unsubscribeUser) unsubscribeUser();
        }
    }

    useEffect(() => {
        const unsubscribeAuth = subscribeAuth(handleUserStateChange);
        console.log('ran')
        return function cleanUp() {
            unsubscribeAuth();
            unsubscribeUser && unsubscribeUser();
        }
    }, []);

    return (
        <div className="App">
            { !isPending ? (
            <Router>
                <Navbar user={ !!user } />
                <section className="content-main-container">
                    <Switch>
                        <Route exact path="/logout">
                            <Logout />
                        </Route>
                        <Route exact path="/login" >
                            <Login location={window.location} user={user}/>
                        </Route>

                        <RestrictedRoute exact path="/signup" isAllowed={ !user } Component={ SignUp } redirect="/profile"/>
                        <RestrictedRoute exact path="/" isAllowed={ user } Component={ TweetManager } redirect="/login" />
                        <RestrictedRoute exact path="/profile" isAllowed={ user } Component={ Profile } redirect="/login" />
                    </Switch>
                </section>
            </Router>
            ) : (
                <div className="loader-wrapper"> 
                    <img className = "global-loader" src={ loader } alt="Loading.." /> 
                </div>
            )}
        </div>
    )
}

export default App;
