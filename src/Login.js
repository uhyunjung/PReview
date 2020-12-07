import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Grid, Paper, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import App from './App';

class Login extends Component {
  // 로그인 상태
  state = { isSignedIn: false }

  // ui config
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  // 렌더링 후 완료
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
    })
  }

  // 렌더링
  render() {
    return (
      <div className="Login">
        <Grid container justify="center" wrap="wrap">
          <Paper className='Paper'>
            {this.state.isSignedIn ? (
              <div>
                <button onClick={() => firebase.auth().signOut()}>로그아웃</button>
                <Link to='/Mypage'><Button>마이페이지</Button></Link>
              </div>
            ) : (
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              )}
          </Paper>
        </Grid>
      </div>
    )
  };
}

export default Login;
