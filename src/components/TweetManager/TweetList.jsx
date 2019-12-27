import React from 'react';

import Tweet from './Tweet';
import InfiniteScroll from 'react-infinite-scroll-component';

import loader from '../../assets/Double Ring-1s-200px.gif';

import TweetManagerContext from '../../contexts/TweetManagerContext';


function TweetList(props) {

	return (
		<TweetManagerContext.Consumer>
			{({ tweets, initialLoad, failedRequest, hasMore, fetchMore }) => {
				if (initialLoad) {
					return <img src={loader} alt="Loading..." />;
				} else if (failedRequest) {
					return (
						<div className="error-message">
							<img
								src="https://66.media.tumblr.com/2e8986a1b1c062623cea1b9edaddcc52/tumblr_mup3qzOPsX1rk0k2jo1_500.gif"
								alt="Error misc"
							/>
							<h1>
								We encountered a problem with the server.
								<br />
								Please try again later :)
							</h1>
						</div>
					);
				} else {
					return (
						<InfiniteScroll
							dataLength={tweets.length}
							next={fetchMore}
							hasMore={hasMore}
							className="tweet-list-main-container"
							loader={<img src={loader} alt="Loading..." />}
						>
							{tweets.map(tweet => (
								<Tweet key={tweet.id} tweet={tweet} />
							))}
						</InfiniteScroll>
					);
				}
			}}
		</TweetManagerContext.Consumer>
	);
}

export default TweetList;
