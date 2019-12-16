import React from "react"

import TweetList from "./TweetList"
import CreateTweet from "./CreateTweet"

import { getTweets, postTweet } from '../lib/api'


import TweetManagerContext from "../contexts/TweetManagerContext"

class TweetManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            tweets: [],
            tweetCounter: 0,
            onPost: this.updateTweets.bind(this)
        }
    }

    updateTweets(tweet) {
        this.setState(prevState => {
            const tweetObj = {
                content: tweet,
                userName: 'Ilann',
                date: '10/10/2019',
                id: prevState.tweetCounter + 1
            }

            return {
               tweets: [ tweetObj, ...prevState.tweets ],
               tweetCounter: ++prevState.tweetCounter
            }
        })
    }

    componentDidMount() {
        getTweets().then(response => this.setState({
            tweets: response.data.tweets
        }))
    }

    render() {
        return (
            <TweetManagerContext.Provider value={ this.state }>
                <CreateTweet />
                <TweetList />
            </TweetManagerContext.Provider>
        )
    }
}

export default TweetManager