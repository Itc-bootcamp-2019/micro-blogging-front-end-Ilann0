import React from "react"

const TweetManagerContext = React.createContext({
    tweets: [],
    onPost: ( tweet ) => {},
    requestPending: false,
    initialLoad: true,
    failedRequest: false,
    user: {},
    hasMore: false, 
    tweetsLength: 0, 
    fetchMore: () => {},
})

export default TweetManagerContext;