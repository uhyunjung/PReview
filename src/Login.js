import React, { useState, useEffect} from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Grid, Paper, Button } from '@material-ui/core';

  const Login = () => {
    const [user, setUser] = React.useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [hasAccount, setHasAccount] = useState(false);
    
    const clearInputs = () => {
      setEmail("");
      setPassword("");
    };
  
    const clearErrors = () => {
      setEmailError("");
      setPasswordError("");
    };
  
    const handleLogin = () => {
      clearErrors();
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(err => {
          switch (err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;
            case "auth/wrong-password":
              setPasswordError(err.message);
              break;
          }
        });
    };
  
    const handleSignUp = () => {
      clearErrors();
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(err => {
          switch (err.code) {
            case "auth/email-already-in-use":
            case "auth/invalid-email":
              setEmailError(err.message);
              break;
            case "auth/weak-password":
              setPasswordError(err.message);
              break;
          }
        });
    };
  
    const authListener = () => {
      firebase.auth().onAuthStateChanged(user => {
        if(user){
          setUser(user);
        } else{
          setUser("");
        }
      })
    };
    
    useEffect(() => {authListener();}, []);


  // ui config
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }

  // 렌더링

    return (
      <div className="Login">
        <Grid container justify="center" wrap="wrap"> 
          <Paper className='Paper'>
          <label>사용자 이메일</label>
          <input type="text" autoFocus required value={email} onChange={(e) => setEmail(e.target.value)}/>
          <p className="errorMsg">{emailError}</p>
          <label>비밀번호</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
          <p className="errorMsg">{passwordError}</p>
          <div className="btnContainer">
            {hasAccount? (
              <>
              <button onClick={handleLogin}>로그인</button>
              <p>계정이 없으면 <Button onClick={()=>setHasAccount(!hasAccount)}>회원가입</Button></p>
              </>
            ):(
              <>
              <button onClick={handleSignUp}>회원가입</button>
              <p>계정이 있으면 <Button onClick={()=>setHasAccount(!hasAccount)}>로그인</Button></p>
              </>
            )}
          </div>

            <hr></hr>
          회원가입
          <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
          </Paper>
        </Grid>
      </div>
    );
  }


export default Login;
