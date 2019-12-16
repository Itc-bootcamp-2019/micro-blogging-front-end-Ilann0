import React from "react"
import Tweet from "./Tweet";

function TweetList(props) {
    const { tweets } = props
    return (
        <div>
            { tweets.map( tweet => <Tweet tweet={ tweet } /> ) }
        </div>
    )
}

export default TweetList