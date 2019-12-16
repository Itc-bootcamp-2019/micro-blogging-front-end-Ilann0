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
        const string    = e.target.value
        const stringLen = e.target.value.length

        this.setState(prevState => {
            return (stringLen < 141) && {
                inputVal: string,
                inputLen: stringLen,
            }
        })
    }

    handlePost(val, parentCallback) {
        if (val.length >= 1) {
            this.setState({
                inputVal: '',
                inputLen: 0,
            })
            parentCallback(val)
        }
    }

    render() {
        const { inputVal, inputLen } = this.state
        return (
            <div className="tweet-box">
                <textarea
                    name="tweet"
                    id="tweet-input"
                    cols="30"
                    rows="10"
                    placeholder="What you have in mind.."
                    value={inputVal}
                    onChange={(e) => this.handleInputChange(e)}
                />
                <div className="tb-bottom">
                    <span className="chars-left" >{ inputLen }/140</span>
                    <TweetManagerContext.Consumer>
                        {
                            ({ onPost }) => (
                                <button
                                    className="post-btn"
                                    onClick={() => this.handlePost(inputVal, onPost)}
                                >Post</button>
                            )
                        }
                    </TweetManagerContext.Consumer>
                </div>
            </div>
        );
    }
}

export default CreateTweet