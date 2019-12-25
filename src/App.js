import React, { useState, useEffect, useContext } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { subscribeAuth } from "./lib/firebase/auth/api";
import { subscribeUser } from "./lib/firebase/database/users";

import './App.css';

import AppManagerContext from "./contexts/AppManagerContext";

import RestrictedRoute from './components/RestrictedRoute'
import TweetManager from "./pages/TweetManager";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Login from './pages/Login';
import SignUp2 from './pages/SignUp2';
import Logout from './pages/Logout';
import { usersRef } from "./lib/firebase/database/refs";

function App() {
    const [ user, setUser ] = useState(null);
    const [ isPending, setPending ] = useState(true);
    const [ initialLogin, setInitialLogin ] = useState(true);
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
        <AppManagerContext.Provider value={ [user, isPending] }>
        <div className="App">
            { !isPending ? (
            <Router>
                <Navbar user={ !!user } />
                <section className="content-main-container">
                    <Switch>
                        { /* Only to make sure the user can't access any of the pages if he is not logged in. */ }

                        {/* <> */}
                        <Route exact path="/signup">
                            <SignUp2 />
                        </Route>
                        <Route exact path="/logout">
                            <Logout />
                        </Route>
                        <Route exact path="/login" >
                            < Login isLoggedIn={!!user} setInitialLogin={setInitialLogin} initialLogin={initialLogin} location={window.location}/>
                        </Route>
                        

                        {/* <RestrictedRoute Component={ Logout } isAllowed={ !!user } exact path="/logout" redirect="/login"/> */}
                        <RestrictedRoute exact path="/" isAllowed={ user } Component={ TweetManager } redirect="/login" />
                        <RestrictedRoute exact path="/profile" isAllowed={ user } Component={ Profile } redirect="/login" />
                    </Switch>
                </section>
            </Router>
            ) : <h1>nope</h1>  /*<img src="" /> */}
        </div> 
        </AppManagerContext.Provider>
    )
}

export default App;
