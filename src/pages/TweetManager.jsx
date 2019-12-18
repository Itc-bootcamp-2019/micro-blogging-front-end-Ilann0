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

	handleFetchError(error) {
		console.log(error.response);
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
