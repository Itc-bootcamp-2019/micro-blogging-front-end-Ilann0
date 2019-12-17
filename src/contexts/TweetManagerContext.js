import React from "react"

const TweetManagerContext = React.createContext({
    tweets: [],
    onPost: ( tweet ) => {},
    requestPending: false,
    initialLoad: true,
})

export default TweetManagerContext