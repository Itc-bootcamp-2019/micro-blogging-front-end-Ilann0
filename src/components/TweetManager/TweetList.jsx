import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Tweet from './Tweet';

import loader from '../../assets/Double Ring-1s-200px.gif';

import TweetManagerContext from '../../contexts/TweetManagerContext';


function TweetList(props) {

	return (
		<TweetManagerContext.Consumer>
			{({ tweets, initialLoad, failedRequest, hasMore, tweetsLength, fetchMore }) => {
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
							dataLength={tweetsLength}
							next={fetchMore}
							hasMore={hasMore}
							className="tweet-list-main-container"
							loader={<h4>Loading...</h4>}
						>
							{/* {console.log(tweetsLength)} */}
							{tweets.map(tweet => (
								<Tweet key={tweet.id} tweet={tweet} />
							))}
						</InfiniteScroll>
					);

					return tweets.map(tweet => (
						<Tweet key={tweet.id} tweet={tweet}/>
					));
				}
			}}
		</TweetManagerContext.Consumer>
	);
}

export default TweetList;
