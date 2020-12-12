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
            <div className="Lecture_review_main">
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
                        <div id="main-middle">
                            <span id="no">No.</span>
                            <span id="title">제목</span>
                            <span id="writer">작성자</span>
                            <span id="date"><input type="button" id="sort-by-date" value="작성날짜▲"></input></span>
                            <span id="view-like">
                                <input type="button" id="sort-by-view" value="조회수"></input>
                                <input type="button" id="sort-by-like" value="좋아요"></input>
                            </span>
                            <hr></hr>
                        </div>
                        <div id="free">
                             
                        </div>
                    </Paper>
                </article>
            </div>
        )
    };
}

export default Community_view_free;
