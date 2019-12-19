import React from 'react'
import TweetManagerContext from "../contexts/TweetManagerContext"

class CreateTweet extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            inputVal: '',
            inputLen: 0,
        }
    }

    handleInputChange(e) {
        const string    = e.target.value
        const stringLen = e.target.value.replace(/\s/g, '').length

        this.setState(() => {
            return (stringLen < 141) && {
                inputVal: string,
                inputLen: stringLen,
            }
        })
    }

    handlePost(val, valLen, parentCallback) {
        if (val.length >= 1 && valLen) {
			this.setState({
				inputVal: '',
				inputLen: 0,
			});
			parentCallback(val);
		}
    }

    render() {
		const { inputVal, inputLen } = this.state
		const buttonClass = inputLen ? 'post-btn' : 'post-btn disabled';
        return (
			<div className="tweet-box input-frame">
				<textarea
					name="tweet"
					id="tweet-input"
					placeholder="What you have in mind.."
					value={inputVal}
					onChange={e => this.handleInputChange(e)}
				/>
				<div className="tb-bottom">
					<span
						className={
							inputLen > 132
								? inputLen > 139
									? 'chars-left red'
									: 'chars-left orange'
								: 'chars-left'
						}
					>
						{inputLen}/140
					</span>
					<TweetManagerContext.Consumer>
						{
						({ onPost, requestPending }) => {
								return (
								<button
									className={ 
										requestPending 
											? buttonClass + ' loading' 
											: buttonClass
									}
									onClick={() =>
										this.handlePost(inputVal, inputLen, onPost)
									}
								>
									{!requestPending && 'Post'}
								</button>
								)
							}
						}
					</TweetManagerContext.Consumer>
				</div>
			</div>
		);
    }
}

export default CreateTweet