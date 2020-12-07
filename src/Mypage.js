import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import './Lecture_review_main.css';

class Mypage extends Component {
    // 렌더링
    render() {
        return (
            <div className="Lecture_review_main">
                <div className="sidebar">
                    <aside class="sidebar">
                        <p>언어</p>
                        <ul class="category">
                            <li><a href="#">C / C++</a></li>
                            <li><a href="#">C#</a></li>
                            <li><a href="#">Java</a></li>
                            <li><a href="#">Python</a></li>
                            <li><a href="#">Javascript</a></li>
                        </ul>
                        <p>분야</p>
                        <ul class="category">
                            <li><a href="#">Algorithm</a></li>
                            <li><a href="#">HTML/CSS/Javascript</a></li>
                            <li><a href="#">Server</a></li>
                            <li><a href="#">Full Stack</a></li>
                            <li><a href="#">ML/DL</a></li>
                        </ul>
                    </aside>
                </div>
                <article id="article">
                    <div class="review_search">
                        <div class="category_name">
                            <span>Full Stack</span>
                        </div>
                        <div>
                            <form class="search">
                                <button>
                                    <i class="fas fa-search"></i>
                                </button>
                                <input class="keyword" type="text" name="search" size="80"></input>
                            </form>
                        </div>
                        <Link to='/lecture_review_write'><Button variant="contained" type="submit">글 작성</Button></Link>
                    </div>
                    <div class="header">
                        <span>링크</span>
                        <span>내용</span>
                        <div class="btn">
                            <button>작성날짜△</button>
                            <button>좋아요</button>
                        </div>

                    </div>
                    <div class="review">
                        <ul>
                            <li class="item">
                                <a href="#"><img src="image.jpg" alt="" width="100"></img></a>
                                <div class="info">
                                    <div class="title">[풀스택] 유튜브 클론코딩(유튜브 백엔드+프론트엔드+배포)</div>
                                    <div class="rank">★★★★☆</div>
                                    <div class="tag">#쉬워요 #효과적이에요 #전체_구조를_보여줘요 #실무적이에요</div>
                                    <Button variant="outlined" color="primary" type="submit">이 강의만 모아보기</Button>
                                </div>
                                <div class="like">
                                    <Button variant="outlined" color="primary" type="submit">삭제</Button>
                                    <span class="date">2020.02.27</span>
                                    <div class="likebtn">
                                        <button>
                                            <i class="fas fa-heart"></i>
                                        </button>
                                        <div class="likepeople">54</div>
                                    </div>
                                    <span class="writer">작성자 : 김작성</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="review">
                        <ul>
                            <li class="item">
                                <a href="#"><img src="image.jpg" alt="" width="100"></img></a>
                                <div class="info">
                                    <div class="title">[풀스택] 유튜브 클론코딩(유튜브 백엔드+프론트엔드+배포)</div>
                                    <div class="rank">★★★★☆</div>
                                    <div class="tag">#쉬워요 #효과적이에요 #전체_구조를_보여줘요 #실무적이에요</div>
                                    <Button variant="outlined" color="primary" type="submit">이 강의만 모아보기</Button>
                                </div>
                                <div class="like">
                                    <span class="date">2020.02.27</span>
                                    <div class="likebtn">
                                        <button>
                                            <i class="fas fa-heart"></i>
                                        </button>
                                        <div class="likepeople">54</div>
                                    </div>
                                    <span class="writer">작성자 : 김작성</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </article>
            </div>
        )
    };
}

export default Mypage;
