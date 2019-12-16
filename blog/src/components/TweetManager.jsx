import React from "react"
import TweetList from "./TweetList";

import TweetManagerContext from "../contexts/TweetManagerContext";
import CreateTweet from "./CreateTweet";

class TweetManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            onPost: this.updateTweets.bind(this)
        }
    }

    updateTweets(tweet) {
        this.setState(prevState => {
           return { tweets: [ tweet, ...prevState.tweets ] }
        })
    }

    render() {
        const { tweets } = this.state
        return (
            <TweetManagerContext.Provider value={ this.state }>
                <CreateTweet />
                <TweetList tweets={ tweets } />
            </TweetManagerContext.Provider>
        )
    }
}

export default TweetManager