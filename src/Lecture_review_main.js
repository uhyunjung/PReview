import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db } from './firebase.js';

class Lecture_review_main extends React.Component {
    Constructor(props) {
        this.myRef = React.createRef();

    }
    // 렌더링 후 완료
    componentDidMount = () => {
        {
            db.collection("reviews")
            .onSnapshot(snaps => {
                snaps.forEach(doc => {
                    const reviewDiv = document.createElement("div");

                    const htmlContent =
                        "<div class=\"review\">\
                                            <ul>\
                                        <li class=\"item\">\
                                            <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                            <div class=\"info\">\
                                            <a href='/Lecture_review_detail?id="+doc.id+"'><div class=\"title\">"+ doc.data().lecture_name + "</div></a>\
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
                    if(this.myRef!=null)
                    {
                        this.myRef.appendChild(reviewDiv);
                    }
                    
                })
            })
        }
    }
    
    // 렌더링 후 완료
    componentDidUpdate = () => {
        {
            db.collection("reviews")
            .onSnapshot(snaps => {
                snaps.forEach(doc => {
                    const reviewDiv = document.createElement("div");

                    const htmlContent =
                        "<div class=\"review\">\
                                            <ul>\
                                        <li class=\"item\">\
                                            <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                            <div class=\"info\">\
                                            <Link to='/Lecture_review_detail?id="+doc.id+"'><div class=\"title\">"+ doc.data().lecture_name + "</div></Link>\
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
                    if(this.myRef!=null)
                    {
                        this.myRef.appendChild(reviewDiv);
                    }
                    
                })
            })
        }
    }

    printStar(star) {
        let ret = "";

        for (let i = 0; i < 5; i++) {
            if (i < star) ret += "★";
            else ret += "☆";
        }

        return ret;
    }

    plusHeart() {

    }

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
                        <div class="header">
                            <span>링크</span>
                            <span>내용</span>
                            <div class="btn">
                                <button>작성날짜△</button>
                                <button>좋아요</button>
                            </div>

                        </div>
                        <div id="reviews" ref={(DOMNodeRef) => {
                 this.myRef=DOMNodeRef;
                }}>

                        </div>
                    </Paper>
                </article>
            </div>
        )
    };
}

export default Lecture_review_main;
