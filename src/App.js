import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './total.css';

import firebase from 'firebase';
import { Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

// 모든 페이지
import Main from './Main';
import Login from './Login';
import Lecture_review_main from './Lecture_review_main';
import Lecture_review_write from './Lecture_review_write';
import Lecture_review_detail from './Lecture_review_detail';
import Mypage from './Mypage';

class App extends Component {
    // 로그인 상태
    state = { isSignedIn: false, open: false, value: "로그인" }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    isSignedOut = () => {
        firebase.auth().signOut();
        this.setState({
            open: false
        })
    }

    // 렌더링 후 완료
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ isSignedIn: !!user })
            {this.state.isSignedIn ? (this.setState({value:"로그아웃"})) : (this.setState({value:"로그인"}))}
        })
    }

    // 렌더링
    render() {
        return (
            <div className="App">
                <Router>
                    {/* 메인메뉴 */}
                    <div className='Menu'>
                        <header id="top">
                            <Link to='/'><h3><a id='PReview_logo' target="_self">PReview</a></h3></Link>
                            <input id="search" type="text" placeholder="통합검색" ></input>
                            {this.state.isSignedIn ? (
                                <div id="loginbar">
                                    <Button id="login" onClick={this.handleClickOpen}>{this.state.value}</Button>
                                    <Dialog
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"LOGOUT"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                로그아웃하시겠습니까?
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleClose} color="primary">
                                                취소
                                            </Button>
                                            <Link to='/' id='login'><Button onClick={this.isSignedOut} color="primary" autoFocus>
                                                확인
                                            </Button></Link>
                                        </DialogActions>
                                    </Dialog>
                                    <Link to='/Mypage'><Button id="mypage">마이페이지</Button></Link>
                                </div>
                            ) : (<div>
                                <Link to="/Login"><Button id="login">{this.state.value}</Button></Link>   
                            </div>
                                )}
                        </header>
                        <nav id='nav'>
                            <ul id='ulmenu' >
                                <Link to='/Lecture_review_main'><li id='nav_item'>강의 리뷰</li></Link>
                                <li id='nav_item'>코딩 캠프 리뷰</li>
                                <li id='nav_item'>솔루션 공유</li>
                                <li id='nav_item'>커뮤니티</li>
                            </ul>
                        </nav>
                    </div>

                    {/* 콘텐츠 경로 Route path */}
                    <div className='Contents'>
                        <Switch>
                            <Route exact path='/' component={Main} />
                            <Route path='/Login' component={this.state.isSignedIn ? (Main) : (Login)} />
                            <Route path='/Lecture_review_main' component={this.state.isSignedIn ? (Lecture_review_main) : (Login)} />
                            <Route path='/Lecture_review_write' component={this.state.isSignedIn ? (Lecture_review_write) : (Login)} />
                            <Route path='/Lecture_review_detail' component={this.state.isSignedIn ? (Lecture_review_detail) : (Login)} />
                            <Route path='/Mypage' component={Mypage} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    };
}

export default App;
