import React from 'react';
import { 
    signIn, 
    subscribeAuth,
    signOut,
    signUp,
    signInWithGoogle,
} from '../lib/firebaseHelpers';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailVal: '',
            passwordVal: '',
        };
    }

    handleInput(event) {
        switch (event.target.id) {
            case 'email':
                this.setState({ emailVal: event.target.value });
                break;
            case 'password':
                this.setState({ passwordVal: event.target.value });
                break;
            default:
                break;
        }
    }

    handleLogin(email, password) {
        signIn(email, password);
    }

    handleLogout() {
        signOut();
    }

    handleSignUp(email, password) {
        signUp(email, password);
    }

    componentDidMount() {
        this.unsubscribeAuth = subscribeAuth();
    }

    componentWillUnmount() {
        this.unsubscribeAuth();
    }

    render() {
        const { emailVal, passwordVal } = this.state;
        return (
            <div className="login-container">
                <input id="email"
                       type="email" 
                       aria-label="email"
                       value={emailVal}
                       onChange={ (e) => this.handleInput(e) }
                />
                <input id="password"
                    type="password"
                    aria-label="password"
                    value={passwordVal}
                    onChange={ (e) => this.handleInput(e) }
                />
                <button onClick={ () => this.handleLogin(emailVal, passwordVal) }
                >
                    Login
                </button>
                <button onClick={ () => this.handleSignUp(emailVal, passwordVal) }>
                    Sign Up
                </button>
                <button onClick={ () => this.handleLogout() }>
                    Logout
                </button>
                <button onClick={ signInWithGoogle }>
                    Google SignIn
                </button>
            </div>
        )
    }
}

export default Login;