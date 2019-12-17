import React from "react"

// Components
import TweetList from "./TweetList"
import CreateTweet from "./CreateTweet"

// General API functions
import { getTweets, postTweet } from '../lib/api'

// I do realize that using a react context with this implementation is overkill
// as it would have been easier to pass the callback as props or using hooks
// but for the sake of the milestone I did it anyways..

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
                            })
            ).catch( error => this.handleFetchError(error) )
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