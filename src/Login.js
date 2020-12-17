import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Grid, Paper, Button, TextField } from '@material-ui/core';
import { db } from './firebase';

const Login = () => {
  const [user, setUser] = React.useState("");
  const [name, setName] = React.useState("");
  const [nickname, setNickname] = React.useState("");
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
    if((name!="")&&(nickname!=""))
    {
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

    db.collection("users").doc(0 + "").set({
      name: name,
      nickname: nickname
    }, { merge: true })
      .then(() => {
      })
      .catch((error) => {
        alert(error.message);
      });
    }
    else {
      alert("이름 및 닉네임을 입력해주세요");
    }
  };

  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);

        firebase.auth().currentUser.providerData.forEach(function (profile) {
          if (profile.displayName != null) {
            db.collection("users").doc(firebase.auth().currentUser.uid).set({
              name: profile.displayName,
              nickname: profile.displayName
            }, { merge: true })
              .then(() => {
              })
              .catch((error) => {
                alert(error.message);
              });
          }
          else if (profile.providerId == "github.com") {
            db.collection("users").doc(firebase.auth().currentUser.uid).set({
              name: firebase.auth().currentUser.uid,
              nickname: firebase.auth().currentUser.uid
            }, { merge: true })
              .then(() => {
              })
              .catch((error) => {
                alert(error.message);
              });
          }
          else {
            var docRef = db.collection("users").doc(0+"");

            docRef.get().then(function (doc) {
              db.collection("users").doc(firebase.auth().currentUser.uid).set({
                name: doc.data().name,
                nickname: doc.data().nickname
              }, { merge: true })
                .then(() => {
                })
                .catch((error) => {
                  alert(error.message);
                });

            }).catch(function (error) {
              console.log("Error getting document:", error);
            });


          }

        });
      }

      setName("");
      setNickname("");
    })
  };

  useEffect(() => { authListener(); }, []);

  const keyHandleLogin = (e) => {
    if (e.key == 'Enter') {
      handleLogin();
    }
  }

  const keyHandleSignUp = (e) => {
    if (e.key == 'Enter') {
      handleSignUp();
    }
  }

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
        <Paper className='Paper2'>
          <div class="def">
          <br></br>
          <TextField label="사용자 이메일" style={{paddingLeft:"3vw"}} autoFocus required value={email} onChange={(e) => setEmail(e.target.value)} />
          <p className="errorMsg">{emailError}</p>

          <TextField label="비밀번호"  style={{paddingLeft:"3vw"}} type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <p className="errorMsg">{passwordError}</p>
          <div className="btnContainer" onKeyPress={keyHandleSignUp}>
            {hasAccount ? (
              <>
                <p class="abc"></p>
                <Button variant="outlined" label="Outlined" style={{marginLeft : "5vw", marginBottom:"0.5vh"}} onClick={handleLogin} onKeyPress={keyHandleLogin}>로그인</Button>

                <p>계정이 없으면 <Button onClick={() => setHasAccount(!hasAccount)}>회원가입</Button></p>
              </>
            ) : (
                <>

                  <TextField label="이름" type="text" style={{paddingLeft:"3vw"}} required value={name} onChange={(e) => setName(e.target.value)} />
                  <p></p>
                  <TextField label="닉네임" type="text" style={{paddingLeft:"3vw" ,paddingBottom: "0.5vh"}}required value={nickname} onChange={(e) => setNickname(e.target.value)} />
                  <p class="abc"></p>
                  <Button variant="outlined" style={{marginLeft : "5vw", marginBottom:"0.5vh"}} label="Outlined" onClick={handleSignUp}>회원가입</Button>
                  <p>계정이 있으면 <Button onClick={() => setHasAccount(!hasAccount)}>로그인</Button></p>
                </>
              )}

          </div>
          </div>
          <hr></hr>
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
