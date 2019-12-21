import React from 'react';

// Components
import TweetList from '../components/TweetList';
import CreateTweet from '../components/CreateTweet';
// Context
import TweetManagerContext from '../contexts/TweetManagerContext';
// Database
import { subscribeTweets, postTweet } from '../lib/firebaseHelpers';

class TweetManager extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			tweets: [],
			onPost: this.handleTweetSend.bind(this),
			requestPending: false,
			initialLoad: true,
			failedRequest: false,
		};
	}

	handleTweetSend(tweet) {
		this.setState({ requestPending: true });
		postTweet(tweet)
			.then(() => this.setState({ requestPending: false }))
			.catch(error => this.handleFetchError(error));
	}

	handleFetchError(error) {
		console.error(error.response);
		this.setState({
			requestPending: false,
			initialLoad: false,
			failedRequest: true,
		});
	}

	updateTweets(tweets) {
		this.setState({ tweets }, () => {
			if (this.state.initialLoad) this.setState({ initialLoad: false });
		});
	}

	componentDidMount() {
		this.unsubscribeTweets = subscribeTweets(this.updateTweets.bind(this));
	}

	componentWillUnmount() {
		this.unsubscribeTweets();
	}

	render() {
		return (
			<TweetManagerContext.Provider value={this.state}>
				<CreateTweet />
				<TweetList />
			</TweetManagerContext.Provider>
		);
	}
}

export default TweetManager;
