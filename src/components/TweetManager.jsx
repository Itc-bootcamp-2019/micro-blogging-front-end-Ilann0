import React from "react"

import TweetList from "./TweetList"
import CreateTweet from "./CreateTweet"

import { getTweets, postTweet } from '../lib/api'


import TweetManagerContext from "../contexts/TweetManagerContext"

class TweetManager extends React.PureComponent {
    constructor(props) {
        super(props)
        this.updateTweets = this.updateTweets.bind(this)
        this.state = {
            tweets: [],
            onPost: this.updateTweets,
            requestPending: false,
            initialLoad: true,
        }
    }

    updateTweets(tweet) {

        const timeStamp = new Date()
        const userName = localStorage.getItem('username')
        const tweetObj = {
            userName: !!userName ? userName : 'anonymous',
            content: tweet,
            date: timeStamp.toISOString(),
        }
        this.setState({ requestPending: true }, () => {
            postTweet(tweetObj)
                .then((response) => console.log(response))
                .catch(() => alert("We encountered a problem with the server.\nPlease try again later :)"))
            this.setState(prevState => {
                return {
                    tweets: [ tweetObj, ...prevState.tweets ],
                    requestPending: false,
                }
            })
        })
    }

    updateData() {
        getTweets()
            .then(response => this.setState({
                        tweets: response.data.tweets,
                        initialLoad: false,
                    }
                )
            ).catch((response) => (response.status > 399 && alert("We encountered a problem with the server.\nPlease try again later :)")))

    }

    componentDidMount() {
        this.updateData()
        this.fetchTweetsInterval = setInterval(this.updateData.bind(this), 10000)
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