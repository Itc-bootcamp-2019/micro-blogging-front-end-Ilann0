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
		this.limit = 10;
		this.state = {
			tweets		  : [],
			onPost		  : this.handleTweetSend.bind(this),
			requestPending: false,
			initialLoad	  : true,
			failedRequest : false,
			user		  : this.props.isAllowed,
			hasMore		  : false,
			tweetsLength  : 0,
			fetchMore	  : this.handleFetchMore.bind(this),
			needsUpdate	  : false,
		};
	}

	
	handleTweetSend(tweet) {
		this.setState({ requestPending: true });
		postTweet({
			content: tweet,
			owner_uid: this.state.user.uid,
		})
		.then(() => {
			this.updateTweets();
			this.setState({ requestPending: false });
		})
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
	
	handleNewTweets(tweets) {
		this.tweetsUpdateQueu = tweets;
		if (this.tweetsUpdateQueu.length > 0) this.setState({ needsUpdate: true })
	}

	updateTweets() {
		this.setState( prevState => ({
			tweets: [ ...this.tweetsUpdateQueu, ...prevState.tweets ],
			needsUpdate: false,
		}), () => {
			this.unsubscribeTweets();
			this.unsubscribeTweets = subscribeTweets(this.state.tweets[0].date,this.handleNewTweets.bind(this)
			);
		});
	}
	
	loadMoreTweets(tweets) {
		this.setState(
			prevState => ({
				tweets: [...prevState.tweets, ...tweets],
				tweetsLength: prevState.tweets.length + tweets.length,
			}), () => {
				if (this.state.initialLoad)
				this.setState({ initialLoad: false });
			}
			);
		}
		
	async handleFetchMore() {
		this.nextBatch = await getNextTweets(
			this.nextBatch,
			this.limit,
			this.loadMoreTweets.bind(this)
		);
		this.setState({ hasMore: !!this.nextBatch });
	}

	async componentDidMount() {
		this.nextBatch = await getNextTweets(
			null,
			this.limit,
			this.loadMoreTweets.bind(this)
		);
		this.unsubscribeTweets = subscribeTweets(
			this.state.tweets[0].date,
			this.handleNewTweets.bind(this)
		);

		this.setState({ hasMore: !!this.nextBatch });
	}

	componentWillUnmount() {
		this.unsubscribeTweets();
	}

	render() {
		const { user, needsUpdate } = this.state;

		return (
			<TweetManagerContext.Provider value={this.state}>
				{ needsUpdate && <button className="update-tweets" onClick={() => this.updateTweets()}>Update tweets</button> }
				<h1 className="main-h1">
					Welcome back{' '}
					{user.first_name.charAt(0).toUpperCase() +
						user.first_name.slice(1)}
					.
				</h1>
				<CreateTweet />
				<TweetList />
			</TweetManagerContext.Provider>
		);
	}
}

export default TweetManager;


