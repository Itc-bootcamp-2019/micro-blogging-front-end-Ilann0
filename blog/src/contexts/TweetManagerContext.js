import React from "react"

const TweetManagerContext = React.createContext({
    tweets: [],
    tweetCounter: 0,
    onPost: ( tweet ) => {}
})

export default TweetManagerContext