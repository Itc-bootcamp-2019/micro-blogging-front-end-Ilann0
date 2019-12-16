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
            onPost: this.updateLocalTweets.bind(this)
        }
    }

    updateLocalTweets(tweet) {
        const timeStamp = new Date()
        const timeStampString = timeStamp.toISOString()
        const tweetObj = {
            content: tweet,
            userName: 'Arnold Schwarzenegger',
            date: timeStampString,
        }
        postTweet(tweetObj).then((response) => console.log(response))
                           .catch(() => alert("We encountered a problem with the server.\nPlease try again later :)"))
        this.setState(prevState => {
            return {
               tweets: [ tweetObj, ...prevState.tweets ],
               tweetCounter: ++prevState.tweetCounter
            }
        })
    }

    updateData() {
        getTweets().then(response => this.setState({
            tweets: response.data.tweets,
        })).catch((response) => (response.status > 399 && alert("We encountered a problem with the server.\nPlease try again later :)")))
    }

    componentDidMount() {
        this.updateData()
        this.fetchTweetsInterval = setInterval(this.updateData, 15000)
    }

    componentWillUnmount() {
        clearInterval(this.fetchTweetsInterval)
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