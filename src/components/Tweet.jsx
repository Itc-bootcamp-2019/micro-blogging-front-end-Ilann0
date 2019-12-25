import React, { useState, useEffect } from "react"
import { getUser } from "../lib/firebase/database/users"

function Tweet(props) {
    const [ username, setUsername ] = useState('')
    const { tweet } = props
    useEffect(() => {
        getUser(tweet.owner_uid).then(response => setUsername(response.data().username));
    }, []);
    
    return (
        <div className="display-tweet-container">
            <div className="dt-top">
                <span className="dt-user">{ username }</span>
                <span className="dt-date" >{ tweet.date }</span>
            </div>
            <span className="dt-content" >{ tweet.content }</span>
        </div>
    )
}

export default Tweet