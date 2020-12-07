import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

// 모든 페이지
import Main from './Main';
import Login from './Login';
import Lecture_review_main from './Lecture_review_main';
import Lecture_review_write from './Lecture_review_write';
import Lecture_review_detail from './Lecture_review_detail';
import Mypage from './Mypage';

class App extends Component {
  // 렌더링
  render() {
    return (
        <div className = "App">
            <Router>
                {/* 메인메뉴 */}
                <div className='Menu'>
                    <header id = "top" style={{width:"100%", height:"30px"}}>
                        <Link to ='/'><h3><a id='PReview_logo' target="_self">PReview</a></h3></Link>
                        <input id="search" type="text" placeholder="통합검색" ></input>
                        <Link to = '/Login' id='login'>로그인</Link>
                    </header>
                    <nav id='nav' style={{width:"100%", height:"50px"}}>
                        <ul >
                            <Link to ='/Lecture_review_main'><li  id='nav_item'>강의 리뷰</li></Link>
                            <li  id='nav_item'>코딩 캠프 리뷰</li>
                            <li  id='nav_item'>솔루션 공유</li>
                            <li  id='nav_item'>커뮤니티</li>
                        </ul>
                    </nav>
                </div>

                {/* 콘텐츠 경로 Route path */}
                <div className='Contents'>
                    <Switch>
                        <Route exact path='/' component={Main} />
                        <Route path='/Login' component={Login} />
                        <Route path='/Lecture_review_main' component={Lecture_review_main} />
                        <Route path='/Lecture_review_write' component={Lecture_review_write} />
                        <Route path='/Lecture_review_detail' component={Lecture_review_detail} />
                        <Route path='/Mypage' component={Mypage} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
  };
}

export default App;
