import React from "react"

function Tweet(props) {
    const { tweet } = props
    return (
        <div className="display-tweet-container">
            <span className="dt-user">{ tweet.userName }</span><br/>
            <span className="dt-content" >{ tweet.content }</span><br/>
            <span className="dt-date" >{ tweet.date }</span><br/>
        </div>
    )
}

export default Tweet