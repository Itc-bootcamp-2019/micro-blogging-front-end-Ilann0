import React from 'react';
import { firebase } from '../firebase'

// Components
import TweetList from './TweetList';
import CreateTweet from './CreateTweet';

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

		this.updateTweets = this.updateTweets.bind(this);

		this.state = {
			tweets: [],
			onPost: this.updateTweets,
			requestPending: false,
			initialLoad: true,
			failedRequest: false,
		};
	}

	updateTweets(tweet) {
		const timeStamp = new Date();
		const userName = localStorage.getItem('username');
		const tweetObj = {
			userName: userName ? userName : 'anonymous',
			content: tweet,
			date: timeStamp.toISOString(),
		};

		this.setState({ requestPending: true });
		this.firebase.add(tweetObj).then(() => {
			this.setState({ requestPending: false })
		});
	}

	// updateTweets(tweet) {
	// 	const timeStamp = new Date();
	// 	const userName = localStorage.getItem('username');
	// 	const tweetObj = {
	// 		userName: !!userName ? userName : 'anonymous',
	// 		content: tweet,
	// 		date: timeStamp.toISOString(),
	// 	};

	// 	this.setState({ requestPending: true });
	// 	postTweet(tweetObj)
	// 		.catch(() =>
	// 			alert(
	// 				'We encountered a problem with the server.\nPlease try again later :)'
	// 			)
	// 		)
	// 		.then(() => this.setState({ requestPending: false }));
	// 	this.setState(prevState => ({
	// 		tweets: [tweetObj, ...prevState.tweets],
	// 	}));
	// }

	handleFetchError(error) {
		console.log(error.response);
		clearInterval(this.fetchTweetsInterval);
		this.setState({
			requestPending: false,
			initialLoad: false,
			failedRequest: true,
		});
	}

	updateData() {
		this.unsubscribe = this.firebase.orderBy('date', 'desc').onSnapshot(snapshot => {
			this.setState({
				tweets: snapshot.docs.map(doc => doc.data()),
				initialLoad: false,
			})
		});
			// .then(response => {
			// 	console.log(response.docs.map(doc => console.log('here ', response.docs.map(doc => doc.data()))))
			// 	this.setState({
			// 		// tweets: response.data.tweets,
			// 		tweets: response.docs.map(doc => doc.data()),
			// 		initialLoad: false,
			// 	})
			// })
			// .catch(error => this.handleFetchError(error));
	}

	componentDidMount() {
		this.updateData();
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
