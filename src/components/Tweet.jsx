import React from "react"

function Tweet(props) {
    const { tweet } = props
    return (
        <div className="display-tweet-container">
            <div className="dt-top">
                <span className="dt-user">{ tweet.userName }</span>
                <span className="dt-date" >{ tweet.date }</span>
            </div>
            <span className="dt-content" >{ tweet.content }</span>
        </div>
    )
}

export default Tweet