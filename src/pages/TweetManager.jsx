import React from 'react';
import { firebase } from '../firebase'

// Components
import TweetList from '../components/TweetList';
import CreateTweet from '../components/CreateTweet';

// I do realize that using a react context with this implementation is overkill
// as it would have been easier to pass the callback as props or using hooks
// but for the sake of the milestone I did it anyways..

// Context
import TweetManagerContext from '../contexts/TweetManagerContext';

class TweetManager extends React.PureComponent {
	constructor(props) {
		super(props);
		this.firebase = firebase
							.firestore()
							.collection('tweets');

		this.postTweet = this.postTweet.bind(this);

		this.state = {
			tweets: [],
			onPost: this.postTweet,
			requestPending: false,
			initialLoad: true,
			failedRequest: false,
		};
	}

	postTweet(tweet) {
		const timeStamp = new Date();
		const username = localStorage.getItem('username');
		const tweetObj = {
			username: username ? username : 'anonymous',
			content: tweet,
			date: timeStamp.toISOString(),
		};

		this.setState({ requestPending: true });
		this.firebase.add(tweetObj).then((response) => {
			console.log(response)
			console.log(response.data)
			this.setState({ requestPending: false })
		});
	}

	handleFetchError(error) {
		console.log(error.response);
		this.setState({
			requestPending: false,
			initialLoad: false,
			failedRequest: true,
		});
	}

	componentDidMount() {
		this.unsubscribe = this.firebase
			.orderBy('date', 'desc')
			.onSnapshot(snapshot => {
				this.setState({
					initialLoad: false,
					tweets: snapshot.docs.map(doc => {
						const tweet = doc.data();
						tweet.id = doc.id;
						return tweet;
					}),
				});
			});
	}

	componentWillUnmount() {
		this.unsubscribe();
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
