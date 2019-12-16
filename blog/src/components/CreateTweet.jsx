import React from 'react'
import TweetManagerContext from "../contexts/TweetManagerContext";

class CreateTweet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputVal: '',
            inputLen: 0,
        }
    }

    handleInputChange(e) {
        this.setState({
            inputVal: e.target.value,
            inputLen: e.target.value.length,
        })
    }

    render() {
        const { inputVal } = this.state
        return (
            <div className="tweet-box">
                <textarea
                    name="tweet"
                    id="tweet-input"
                    cols="30"
                    rows="10"
                    value={inputVal}
                    onChange={(e) => this.handleInputChange(e)}
                />
                <TweetManagerContext.Consumer>
                    {
                        ({ onPost }) => (
                            <button onClick={() => onPost(inputVal)}>Post</button>
                        )
                    }
                </TweetManagerContext.Consumer>
            </div>
        );
    }
}

export default CreateTweet