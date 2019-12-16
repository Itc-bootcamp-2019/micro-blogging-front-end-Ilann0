import React from "react"
import Tweet from "./Tweet"

import TweetManagerContext from "../contexts/TweetManagerContext"

function TweetList() {
    return (
        <TweetManagerContext.Consumer>
            {
                ({ tweets }) => tweets.map( tweet => (
                        <Tweet key={ tweet.date } tweet={ tweet } />
                    ))
            }
        </TweetManagerContext.Consumer>
    )
}

export default TweetList