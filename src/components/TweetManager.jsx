import React from "react"

// Components
import TweetList from "./TweetList"
import CreateTweet from "./CreateTweet"

// General API functions
import { getTweets, postTweet } from '../lib/api'

// Context
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
            failedRequest: false,
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

    handleFetchError(error) {
        console.log(error);
        clearInterval(this.fetchTweetsInterval)
        this.setState({
            requestPending: false,
            initialLoad: false,
            failedRequest: true,
        })
    }

    updateData() {
        getTweets()
            .then(response => this.setState({
                        tweets: response.data.tweets,
                        initialLoad: false,
                    }
                )
            ).catch( error => {
                return !!error.response && (error.response.data.statusCode > 399 && this.handleFetchError(error))
            })
    }

    componentDidMount() {
        this.updateData()
        this.fetchTweetsInterval = setInterval(this.updateData, 10000)
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