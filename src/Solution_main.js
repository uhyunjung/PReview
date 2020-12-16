import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db } from './firebase.js';

class Solution_main extends Component {
    Constructor(props) {
        this.myRef = React.createRef();

    }

        // 렌더링 후 완료
        getUrlParams() {
            let params = {};
            params["search_exist"] = false;
            params["order_by"] = "date";

            let exist = false;
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; params[key+"_exist"] = true;});

            return params;
        }

        componentDidMount = () => {
            {
                let params = this.getUrlParams();
                let search;
                if(params.search_exist) {
                    search = decodeURI(params.search).toLowerCase();
                    console.log(search);
                }
                console.log(params.board);
                let board = decodeURI(params.board);
                console.log(board);

                db.collection("solution")
                .orderBy(params.order_by,"desc")
                .onSnapshot(snaps => {
                    snaps.forEach(doc => {
                        let title = doc.data().title//.toLowerCase();
                        console.log(title);
                        if (params.board == doc.data().board || (params.search_exist && title.indexOf(search) != -1)){
                            const reviewDiv = document.createElement("div");

                            const htmlContent =
                                "<div class=\"review\">\
                                    <ul>\
                                        <li class=\"item\">\
                                            <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                                <div class=\"info\">\
                                            <a href='/Solution_detail?board="+board+"&id="+doc.id+"'><div class=\"title\">"+doc.data().title+"</div></a>\
                                            </div>\
                                            <span class=\"writer\">작성자 : "+doc.data().writer_name+"</span>\
                                            <span class=\"date\">"+doc.data().date+"</span>\
                                            <div class=\"likebtn\">\
                                                <i class=\"date\">♥</i>\
                                                <div class=\"date\">"+doc.data().like+"</div>\
                                            </div>\
                                        </li>\
                                    </ul>\
                                </div>";

                            reviewDiv.innerHTML = htmlContent;
                            if(this.myRef!=null)
                            {
                                this.myRef.appendChild(reviewDiv);
                            }
                        }
                    })
                })
            }
        }

        // 렌더링
        render() {
            let params = this.getUrlParams();
            let board = params.search_exist ? "솔루션" : decodeURI(params.board)

            return (
                <div className="Lecture_review_main" class="main_body">
                <div className="sidebar">
                    <aside class="sidebar" >
                        <ul class="category_camp">
                           <li><a href="/Solution_main?board=솔루션">솔루션</a></li>
                        </ul>
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
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day" style={{ color: "#27a23c" }}>●</td>
                                            <td class="day"></td>
                                        </tr>
                                        <tr>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day" style={{ color: "#725ef1" }}>●</td>
                                            <td class="day"></td>
                                            <td class="day" style={{ color: "#27a23c" }}>●</td>
                                        </tr>
                                        <tr>
                                            <td></td>
                                            <td style={{ color: "#725ef1" }}>●</td>
                                            <td class="day"></td>
                                            <td class="day" style={{ color: "#eb9615" }}>●</td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                        </tr>
                                        <tr>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day" style={{ color: "#eb9615" }}>●</td>
                                        </tr>
                                        <tr>
                                            <td class="day"></td>
                                            <td class="day" style={{ color: "#725ef1" }}>●</td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day"></td>
                                            <td class="day" style={{ color: "#27a23c" }}>●</td>
                                            <td class="day"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </article>
                        </div>
                        <br></br>
                        <div class='schedule2'>
                            <h4 style={{ color: "#27a23c", display: "inline-block" }}>●</h4>&nbsp;
                            <h4 style={{ color: "#585858", display: "inline-block" }}> 대회 </h4>&nbsp;
                        </div>
                        <div class='schedule3'>
                            <p> ◦ 1일(금) Facebook HackerCup R1</p>
                            <p> ◦ 9일(토) Google CodeJam</p>
                            <p> ◦ 29일(금) Facebook HackerCup R2</p>
                        </div>
                        <div class='schedule2'>
                            <h4 style={{ color: "#725ef1", display: "inline-block" }}>● </h4>&nbsp;
                            <h4 style={{ color: "#585858", display: "inline-block" }}> 캠프 </h4>&nbsp;
                        </div>
                        <div class='schedule3'>
                            <p> ◦ 7일 SSAFY 지원 마감</p>
                            <p> ◦ 11일 Naver 부스트캠프 지원 시작</p>
                            <p> ◦ 25일 우아한테크캠프 최종 발표</p>
                        </div>
                        <div class='schedule2'>
                            <h4 style={{ color: "#eb9615", display: "inline-block" }}>● </h4>&nbsp;
                            <h4 style={{ color: "#585858", display: "inline-block" }}> 채용 </h4>&nbsp;
                        </div>
                        <div class='schedule3'>
                            <p> ◦ 13일 Sk c&c 딥러닝 R&D</p>
                            <p> ◦ 23일 Kakao 공채</p>
                        </div>
                    </aside>
                </div>


                    <article class="article">
                    <Paper classname="paper" elevation={2}>
                        <div class="review_search">
                            <div class="category_name">
                                <span>{board}</span>
                            </div>
                            <div>
                                <form class="search">
                                    <input class="keyword" type="text" name="search" size="80"></input>
                                </form>
                            </div>
                            <div class="write_button">
                            <Link to={'/Solution_write?board='+board}><Button id='write_btn' variant="outlined" type="submit">글작성</Button></Link>
                            </div>
                        </div>

                        <div class="header">
                            <span>제목</span>
                            <span> </span>
                            <span> </span>
                            <span> </span>
                            <span> </span>
                            <span>작성자</span>
                            <div class="btn">
                                <button><a href={"/Solution_main?board="+board}>작성날짜△</a></button>
                                <button><a href={"/Solution_main?board="+board+"&order_by=like"}>좋아요△</a></button>
                            </div>
                        </div>
                        <div id="posting" ref={(DOMNodeRef) => {
                     this.myRef=DOMNodeRef;
                    }}>
                        </div>
                        </Paper>
                    </article>
                </div>
            )
        };
    }

export default Solution_main;
