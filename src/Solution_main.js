import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db } from './firebase.js';

class Solution_main extends Component {
    plusHeart(){
        
    }

    // 렌더링
    render() {
        return (
            <div className="Lecture_review_main">
                <div className="sidebar">
                <div class='main_left'>
                    <div class='schedule'>
                        <article class="mainarticle">
                            <p class='small_title_cal'>12월의 일정</p>
                            <table class="tg">
                                <thead>
                                    <tr>
                                        <th class="sunday">일</th>
                                        <th class="weekday">월</th>
                                        <th class="weekday">화</th>
                                        <th class="weekday">수</th>
                                        <th class="weekday">목</th>
                                        <th class="weekday">금</th>
                                        <th class="saturday">토</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="day" style={{ color: "green" }}>●</td>
                                        <td class="day"></td>
                                        <td class="day"></td>
                                        <td class="day"></td>
                                        <td class="day" style={{ color: "purple" }}>●</td>
                                        <td class="day"></td>
                                        <td class="day"></td>
                                    </tr>
                                    <tr>
                                        <td class="day"></td>
                                        <td class="day" style={{ color: "purple" }}>●</td>
                                        <td class="day"></td>
                                        <td class="day" style={{ color: "orange" }}>●</td>
                                        <td class="day"></td>
                                        <td class="day" style={{ color: "green" }}>●</td>
                                        <td class="day"></td>
                                    </tr>
                                    <tr>
                                        <td class="day"></td>
                                        <td class="day"></td>
                                        <td class="day"></td>
                                        <td class="day"></td>
                                        <td class="day" style={{ color: "orange" }}>●</td>
                                        <td class="day"></td>
                                        <td class="day">●</td>
                                    </tr>
                                    <tr>
                                        <td class="day"></td>
                                        <td class="day" style={{ color: "purple" }}>●</td>
                                        <td class="day"></td>
                                        <td class="day"></td>
                                        <td class="day"></td>
                                        <td class="day" style={{ color: "green" }}>●</td>
                                        <td class="day"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </article>
                    </div>

                    <div class='schedule2'>
                        <h4 style={{ color: "green", display: "inline-block" }}>● </h4>
                        <h4 style={{ color: "#585858", display: "inline-block" }}>대회 </h4>
                        <h4 style={{ color: "#purple", display: "inline-block" }}>● </h4>
                        <h4 style={{ color: "#585858", display: "inline-block" }}>캠프 </h4>
                        <h4 style={{ color: "#orange", display: "inline-block" }}>● </h4>
                        <h4 style={{ color: "#585858", display: "inline-block" }}>채용 </h4>
                    </div>
                    <div class='schedule3'>
                        <p> ◦ 1일 2020 E-PEER</p>
                        <p> ◦ 5일 Google 코딩 부트 캠프</p>
                        <p> ◦ 11일 2020 하반기 삼성전자 공채</p>
                        <p> ◦ 13일 Google CodeJam</p>
                        <p> ◦ 19일 Sk c&c 딥러닝 R&D</p>
                    </div>
                </div>
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
                        <Link to='/Solution_write'><Button variant="contained" type="submit">글 작성</Button></Link>
                    </div>
                    <div class="header">
                        <span>링크</span>
                        <span>내용</span>
                        <div class="btn">
                            <button>작성날짜△</button>
                            <button>조회수△</button>
                            <button>좋아요</button>
                        </div>

                    </div>
                    <div id="solution">
                        {db.collection("solution")
                        .onSnapshot(snaps => {
                            document.getElementById("solution").innerHTML='';
                            snaps.forEach(doc => {
                                const reviewDiv = document.createElement("div");

                                const htmlContent =
                                "<div class=\"review\">\
                                    <ul>\
                                        <li class=\"item\">\
                                            <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                            <div class=\"info\">\
                                            <Link to='/Lecture_review_detail'><div class=\"title\">"+doc.data().lecture_id+"</div></Link>\
                                            </div>\
                                            <div class=\"like\">\
                                                <span class=\"date\">"+doc.data().date+"</span>\
                                                <div class=\"likebtn\">\
                                                    <button id=\"fas fa-heartBtn\" onClick={plusHeart}>\
                                                        <i class=\"fas fa-heart\">♥</i>\
                                                    </button>\
                                                <div class=\"likepeople\">"+doc.data().like+"</div>\
                                                </div>\
                                            <span class=\"writer\">작성자 : "+doc.data().writer_id+"</span>\
                                            </div>\
                                        </li>\
                                    </ul>\
                                </div>";

                                console.log(htmlContent);

                                reviewDiv.innerHTML = htmlContent;

                                document.getElementById("solution").appendChild(reviewDiv);
                            })
                        })}
                    </div>
                    </Paper>
                </article>
            </div>
        )
    };
}

export default Solution_main;
