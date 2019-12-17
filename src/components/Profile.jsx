import React, {Component} from 'react'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputVal: '',
        }
    }

    handleInputChange(e) {
        this.setState({
            inputVal: e.target.value,
        })
    }

    saveUsername(userName) {
        localStorage.setItem('username', userName)
        console.log(localStorage.getItem('username'))
    }

    componentDidMount() {
        const userName = localStorage.getItem('username')
        !!userName && this.setState({ inputVal: userName })
    }

    render() {
        const { inputVal } = this.state
        return (
            <div className="profile-main-container">
                <h1>Profile</h1>
                <label htmlFor="name-input">
                    User Name
                </label>
                <div className="input-frame">
                    <input id="name-input"
                           type="text"
                           placeholder="i.e.: Yonatan"
                           onChange={(e) => this.handleInputChange(e)}
                           value={ inputVal }
                    />
                </div>
                    <button className="post-btn"
                            onClick={ () => this.saveUsername(inputVal) }
                    >Save</button>
            </div>
        );
    }
}

export default Profile;