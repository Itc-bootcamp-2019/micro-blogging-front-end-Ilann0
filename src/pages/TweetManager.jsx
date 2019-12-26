import React from 'react';

// Components
import TweetList   from '../components/TweetManager/TweetList';
import CreateTweet from '../components/TweetManager/CreateTweet';
// Context
import TweetManagerContext from '../contexts/TweetManagerContext';
// Database
import { subscribeTweets, postTweet, getNextTweets } from '../lib/firebase/database/tweets';

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
			hasMore: true,
			tweetsLength: 0,
			fetchMore: this.handleFetchMore.bind(this),
		};
	}

	async handleFetchMore() {
		this.nextBatch = await getNextTweets(this.nextBatch, this.updateTweets.bind(this));
		this.setState({hasMore: !!this.nextBatch})
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
		this.setState( (prevState) => ({
			tweets: [ ...prevState.tweets, ...tweets ],
			tweetsLength: prevState.tweets.length + tweets.length,
		}), () => {
			if (this.state.initialLoad) this.setState({ initialLoad: false });
		})
	}

	// async doesHaveMore() {
	// 	this.response = await getNextTweets(this.state.tweets[this.state.tweets.length - 1].id);
	// 	if (this.response) {
	// 		this.setState( (prevState) => ({
	// 				tweets: [ this.response.docs(), ...prevState.tweets ],
	// 				tweetsLength: this.response.docs().length,
	// 			})
	// 		);
	// 	}
		// getNextTweets()
		// 	.then(response => {
		// 		if (response) {
		// 			this.setState((prevState) => ({
		// 					tweets: [ response.docs(), ...prevState.tweets ],
		// 					tweetsLength: response.docs().length,
		// 				})
		// 			);
		// 		}
		// 	}) 
	// }

	async componentDidMount() {
		// this.unsubscribeTweets = subscribeTweets(this.updateTweets.bind(this));
		this.nextBatch = await getNextTweets(false, this.updateTweets.bind(this));

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
