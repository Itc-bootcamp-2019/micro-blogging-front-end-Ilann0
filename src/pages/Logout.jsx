import React, { useState, useEffect } from 'react';
import { signOut } from "../lib/firebase/auth/api";

function Logout() {
    const [ success, setSuccess ] = useState(false);
    
    useEffect(() => {
        console.log('hello')
        signOut().then( response => {
            setSuccess(true)
        });
    }, [])
    return (
        <>
            { success ? (
                <h1>You have successfully been logged out</h1>
            ) : (
                <h1>Pending...</h1>
            ) }
        </>
    )
}

export default Logout;