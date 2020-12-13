import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db } from './firebase.js';

class Community_view_free extends Component {
    // 렌더링 후 완료
    componentDidMount = () => {
        {
            db.collection("free")
            .onSnapshot(snaps => {
                document.getElementById("free").innerHTML = '';
                snaps.forEach(doc => {
                    const reviewDiv = document.createElement("div");

                    const htmlContent =
                        "<div class=\"review\">\
                                            <ul>\
                                        <li class=\"item\">\
                                            <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                            <div class=\"info\">\
                                            <Link to='/Lecture_review_detail'><div class=\"title\">"+ doc.data().lecture_id + "</div></Link>\
                                                <div class=\"rank\">"+ this.printStar(doc.data().star) + "</div>\
                                                <div class=\"tag\">"+ doc.data().tags + "</div>\
                                                <Button variant=\"outlined\" color=\"primary\" type=\"submit\">이 강의만 모아보기</Button>\
                                            </div>\
                                            <div class=\"like\">\
                                                <span class=\"date\">"+ doc.data().date + "</span>\
                                                <div class=\"likebtn\">\
                                                    <button id=\"fas fa-heartBtn\" onClick={plusHeart}>\
                                                        <i class=\"fas fa-heart\">♥</i>\
                                                    </button>\
                                                <div class=\"likepeople\">"+ doc.data().like + "</div>\
                                                </div>\
                                            <span class=\"writer\">작성자 : "+ doc.data().writer_id + "</span>\
                                            </div>\
                                        </li>\
                                    </ul>\
                                </div>";

                    console.log(htmlContent);

                    reviewDiv.innerHTML = htmlContent;

                    document.getElementById("reviews").appendChild(reviewDiv);
                })
            })
        }
    }


    plusHeart() {

    }

    // 렌더링
    render() {
        return (
            <div className="Community_view_detail">
                <div className="sidebar">
                    <aside class="sidebar">
                        <Link to='/Community_view_main'><p>자유게시판</p></Link>
                        <br></br>
                        <Link to='/Community_view_main'><p>질문게시판</p></Link>
                        <br></br>
                        <Link to='/Community_view_main'><p>강의 수강원 모집</p></Link>
                        <br></br>
                        <Link to='/Community_view_main'><p>프로젝트 참가자 모집</p></Link>
                    </aside>
                </div>
                <article class="article">
                    <Paper classname="paper" elevation={2}>

                        // article 부분
                        <div class="post-header">
                            <span id="title">[C/C++] 백준 별 찍기 문제</span>
                            <div id="post-header-info">
                                <div id="writer">김작성</div>
                                <div id="date">2020.12.03</div>
                            </div>
                        </div>
                        

                        <div class="post-detail">
                            <p>
                                안녕하세요<br></br>
                                    문제 링크입니다<br></br>
                                        이게 제 코드인데요<br></br>
                                            이런 에러 메세지가 뜨네요<br></br>
                                                왜 이럴까요<br></br>
                                                    봐 주시면 감사하겠습니다
                            </p>
                        </div>
                        

                        <div class="post-tail">
                            <span id="comment-text">댓글</span>
                            <div id="post-tail-info">
                                <button id="like"><i class="fas fa-heart"></i></button>
                                <span id="like">54</span>
                                <button id="write">글 수정</button>
                            </div>
                        </div>

                        <div class="comment">
                            <div class="comment_write">
                                <input id="content" type="text"></input>
                                <input type="submit" id="write" value="작성"></input>
                            </div>
                            <div class="comment_show">
                                <div class="comment_item">
                                    <span class="name">닉네임 1</span>
                                    <span class="content">저도 같은 에러 나오네요ㅠㅠ</span>
                                    <span class="date">2020/11/7 17:35:55</span>
                                </div>
                                <div class="comment_item">
                                    <span class="name">닉네임 2</span>
                                    <span class="content">이거 확인해보셨나요?</span>
                                    <span class="date">2020/11/7 17:35:55</span>
                                </div>
                            </div>
                        </div>
                      
                    </Paper>
                </article>
            </div>
        )
    };
}

export default Community_view_free;