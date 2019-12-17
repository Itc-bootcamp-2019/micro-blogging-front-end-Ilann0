import React, { useEffect } from "react"
import Tweet from "./Tweet"

import TweetManagerContext from "../contexts/TweetManagerContext"

function TweetList() {
    return (
        <TweetManagerContext.Consumer>
            {
                ({ tweets, initialLoad }) => {
                    if (initialLoad) {
                        return <img src="https://thumbs.gfycat.com/LameDifferentBalloonfish-max-1mb.gif" alt=""/>
                    } else {
                        return tweets.map( tweet => (
                            <Tweet key={ tweet.date }
                                   tweet={ tweet }
                            />)
                        )
                    }
                }
            }
        </TweetManagerContext.Consumer>
    )
}

export default TweetList