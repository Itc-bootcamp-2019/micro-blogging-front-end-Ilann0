import React from 'react';

// Components
import TweetList   from '../components/TweetManager/TweetList';
import CreateTweet from '../components/TweetManager/CreateTweet';
// Context
import TweetManagerContext from '../contexts/TweetManagerContext';
// Database
import { subscribeTweets, postTweet } from '../lib/firebase/database/tweets';

class TweetManager extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			tweets: [],
			onPost: this.handleTweetSend.bind(this),
			requestPending: false,
			initialLoad: true,
			failedRequest: false,
			user: this.props.isAllowed,
		};
	}

	handleTweetSend(tweet) {
		this.setState({ requestPending: true });
		postTweet({ 
			content: tweet,
			owner_uid: this.state.user.uid,
		 })
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
		const { user } = this.state;
		return (
			<TweetManagerContext.Provider value={this.state}>
				<h1 className='main-h1'>
					Welcome back{' '}
					{user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)}.
				</h1>
				<CreateTweet />
				<TweetList />
			</TweetManagerContext.Provider>
		);
	}
}

export default TweetManager;
