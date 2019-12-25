import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { subscribeAuth } from "./lib/firebase/auth/api";
import { subscribeUser } from "./lib/firebase/database/users";

import loader from './assets/Double Ring-1s-200px.gif';
import './App.css';

import AppManagerContext from "./contexts/AppManagerContext";

import RestrictedRoute from './components/RestrictedRoute'
import TweetManager from "./pages/TweetManager";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
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
        
        return function cleanUp() {
            unsubscribeAuth();
            unsubscribeUser && unsubscribeUser();
        }
    }, []);
    return (
        // <AppManagerContext.Provider value={ [user, isPending] }>
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
                    <img className = "global-loader" src = {loader} /> 
                </div>
            )}
        </div> 
        // </AppManagerContext.Provider>
    )
}

export default App;
