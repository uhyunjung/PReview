import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './total.css';

import firebase from 'firebase';
import {  Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

// 모든 페이지
import Main from './user/Main';
import Login from './user/Login';
import Lecture_review_main from './lecture_review/Lecture_review_main';
import Lecture_review_write from './lecture_review/Lecture_review_write';
import Lecture_review_detail from './lecture_review/Lecture_review_detail';
import Lecture_review_edit from './lecture_review/Lecture_review_edit';
import Camp_review_main from './camp_review/Camp_review_main';
import Camp_review_write from './camp_review/Camp_review_write';
import Camp_review_detail from './camp_review/Camp_review_detail';
import Camp_review_edit from './camp_review/Camp_review_edit';
import Solution_main from './solution/Solution_main';
import Solution_write from './solution/Solution_write';
import Solution_detail from './solution/Solution_detail';
import Solution_edit from './solution/Solution_edit';
import Community_view_main from './community_view/Community_view_main';
import Community_view_write from './community_view/Community_view_write';
import Community_view_detail from './community_view/Community_view_detail';
import Community_view_edit from './community_view/Community_view_edit';
import Mypage from './user/Mypage';

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
            { this.state.isSignedIn ? (this.setState({ value: "로그아웃" })) : (this.setState({ value: "로그인" })) }
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
                            <Link to='/?board=reviews&title=lecture_name&title=lecture_name&post_location=Lecture_review_detail'><h3><a id='PReview_logo' target="_self">PReview</a></h3></Link>
                            
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
                            <li id='nav_item'><Link to="/Lecture_review_main?board=C/C++">강의 리뷰</Link>
                                    <ul id='in_nav'>
                                        <li id='in_nav_category'>언어</li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=C/C++">  C/C++</a></li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=C#">  C#</a></li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=Java">  Java</a></li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=Python">  Python</a></li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=Javascript">  Javascript</a></li>
                                        <li id='in_nav_category'>분야</li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=Algorithm">  Algorithm</a></li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=FrontEnd">  FrontEnd</a></li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=Server">  Server</a></li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=Database">  Database</a></li>
                                        <li id='in_nav_item'><a href="/Lecture_review_main?board=ML/DL">  ML/DL</a></li>
                                    </ul>
                                    </li>
                                <li id='nav_item'><Link to="/Camp_review_main?board=알고리즘">코딩 캠프 리뷰</Link>
                                    <ul id='in_nav'>
                                        <li id='in_nav_item'><a href="/Camp_review_main?board=알고리즘">  알고리즘</a></li>
                                        <li id='in_nav_item'><a href="/Camp_review_main?board=웹프로그래밍">  웹프로그래밍</a></li>
                                        <li id='in_nav_item'><a href="/Camp_review_main?board=데이터 분석">  데이터 분석</a></li>
                                        <li id='in_nav_item'><a href="/Camp_review_main?board=AI">  AI</a></li>
                                    </ul>
                                </li>
                                <li id='nav_item'><Link to='/Solution_main?board=솔루션'>솔루션 공유</Link></li>
                                <li id='nav_item'><Link to="/Community_view_main?board=자유게시판">커뮤니티</Link>
                                <ul id='in_nav'>
                                  <li id='in_nav_item'><a href="Community_view_main?board=자유게시판">  자유게시판</a></li>
                                  <li id='in_nav_item'><a href="Community_view_main?board=질문게시판">  질문게시판</a></li>
                                  <li id='in_nav_item'><a href="Community_view_main?board=강의 수강원 모집">  강의 수강원 모집</a></li>
                                  <li id='in_nav_item'><a href="Community_view_main?board=프로젝트 참가자 모집">  프로젝트 참가자 모집</a></li>
                                </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* 콘텐츠 경로 Route path */}
                    <div className='Contents'>
                        <Switch>
                            <Route exact path='/' component={Main} />
                            <Route path='/Login' component={this.state.isSignedIn ? (Main) : (Login)} />
                            <Route path='/Lecture_review_main' component={Lecture_review_main} />
                            <Route path='/Lecture_review_write' component={this.state.isSignedIn ? (Lecture_review_write) : (Login)} />
                            <Route path='/Lecture_review_detail' component={Lecture_review_detail} />
                            <Route path='/Lecture_review_edit' component={Lecture_review_edit} />
                            <Route path='/Camp_review_main' component={Camp_review_main} />
                            <Route path='/Camp_review_write' component={this.state.isSignedIn ? (Camp_review_write) : (Login)} />
                            <Route path='/Camp_review_detail' component={Camp_review_detail} />
                            <Route path='/Camp_review_edit' component={Camp_review_edit} />
                            <Route path='/Community_view_main' component={Community_view_main} />
                            <Route path='/Community_view_write' component={this.state.isSignedIn ? (Community_view_write) : (Login)} />
                            <Route path='/Community_view_detail' component={Community_view_detail} />
                            <Route path='/Community_view_edit' component={Community_view_edit} />
                            <Route path='/Solution_main' component={Solution_main} />
                            <Route path='/Solution_write' component={this.state.isSignedIn ? (Solution_write) : (Login)} />
                            <Route path='/Solution_detail' component={Solution_detail} />
                            <Route path='/Solution_edit' component={Solution_edit} />
                            <Route path='/Mypage' component={Mypage} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    };
}

export default App;