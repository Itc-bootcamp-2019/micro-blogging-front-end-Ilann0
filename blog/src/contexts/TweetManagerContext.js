import React from "react"

const TweetManagerContext = React.createContext({
    tweets: [],
    onPost: ( tweet ) => {},
})

export default TweetManagerContext