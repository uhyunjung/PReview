import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './total.css';
import { db } from "./firebase.js";

class Main extends Component {
    constructor(props) {
        super(props);
        this.list = [];
    }

    getUrlParams() {
        let params = {};
        params["post"] = false;
        params["title"] = false;
        params["lecture_name"] = false;
        params["post_location"] = false;

        let exist = false;
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; params[key + "_exist"] = true; });

        return params;
    }

    // 렌더링 후 완료
    componentDidMount = () => {

        db.collection("reviews")
            .orderBy("like", "desc").limit(5)
            .onSnapshot(snaps => {
                snaps.forEach(doc => {
                    if(this.list.indexOf(doc.id) == -1)
                    {
                    this.list.push(doc.id);
                    const reviewDiv = document.createElement("div");

                    let htmlContent =
                    "<div class=\"main_info\">\
                        <ul>\
                            <li class=\"main_post_item\">\
                                <div class=\"main_info\">\
                                    <a href='/Lecture_review_detail?board="+ doc.data().board + "&id=" + doc.id + "'><div class=\"hot_title\">" +"• "+ doc.data().lecture_name + "</div></a>\
                                </div>\
                            </li>\
                        </ul>\
                    </div>";

                    reviewDiv.innerHTML = htmlContent;
                    if (this.myRef != null) {
                        this.myRef.appendChild(reviewDiv);
                    }
                }
                })
            })
    }


    // 렌더링
    render() {
        let params = this.getUrlParams();
        let board = params.post ? "좋아요 게시물" : decodeURI(params.board);
        let title = params.post ? "좋아요 게시물" : decodeURI(params.title);
        let lecture_name = params.post ? "좋아요 게시물" : decodeURI(params.lecture_name);
        let post_location = params.post ? "좋아요 게시물" : decodeURI(params.post_location);
        console.log(lecture_name);

        console.log(board);

        return (
            <div className="Main" class="main_body">
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
                </div>

                <div class="main_right">
                    <div id='main_right_top'>
                        <p class='small_title'>인기 게시물</p>
                        <nav id='nav2'>
                            <ul class='main_posting'>
                                <li id='nav_item2' style={{ borderLeft: "none" }}><Link to="/?board=reviews&title=lecture_name&post_location=Lecture_review_detail&lecture_name=lecture_name">강의 리뷰</Link></li>
                                <li id='nav_item2'><Link to="/?board=postings&title=title&post_location=Camp_review_detail">코딩 캠프 리뷰</Link></li>
                                <li id='nav_item2'><Link to='/?board=solution&title=title&post_location=Solution_detail'>솔루션 공유</Link></li>
                                <li id='nav_item2'><Link to='/?board=community&title=title&post_location=Community_view_detail'>커뮤니티</Link></li>
                                <div class="hot_post">
                                </div>

                                <div id="like_post" ref={(DOMNodeRef) => {
                                    this.myRef = DOMNodeRef;
                                }}>
                                {
                                    db.collection(board)
                                    .orderBy("like", "desc").limit(5)
                                    .onSnapshot((snaps) => {
                                        document.getElementById("like_post").innerHTML = "";
                                        snaps.forEach((doc) => {
                                           
                                            this.list.push(doc.id);

                                            const reviewDiv = document.createElement("div");
                                            let title;
                                            if(board == "reviews") title = doc.data().lecture_name;
                                            else title = doc.data().title;
                                            const htmlContent =
                                            "<div class=\"main_info\">\
                                                <ul>\
                                                    <li class=\"main_post_item\">\
                                                        <div class=\"main_info\">\
                                                            <a href='/Lecture_review_detail?board="+ doc.data().board + "&id=" + doc.id + "'><div class=\"hot_title\">" +"• "+ title + "</div></a>\
                                                        </div>\
                                                    </li>\
                                                </ul>\
                                            </div>";

                                            reviewDiv.innerHTML = htmlContent;

                                            if ((reviewDiv != null) && (document.getElementById("like_post") != null)) {
                                                document.getElementById("like_post").appendChild(reviewDiv);
                                        }
                                        
                                        })
                                    })
                                }

                                </div>
                            </ul>
                        </nav>
                        <hr id="line"></hr>
                    </div>
                    <div id='main_right_bottom'>
                        <p class="small_title">프로그래밍 강의 사이트</p>
                        <div id='main_algorithm'>
                            <input id='next' type="button" value="◀"></input>
                            <div id='site_box'>
                                <a href="https://www.acmicpc.net/">백준</a></div>
                            <div id='site_box'>
                                <a href="https://leetcode.com/">Leet code</a></div>
                            <div id='site_box'>
                                <a href="https://www.edwith.org/">Edwith</a></div>
                            <div id='site_box'>
                                <a href="https://opentutorials.org/course/1">생활 코딩</a></div>
                            <div id='site_box'>
                                <a href="https://www.udemy.com/">Udemy</a></div>
                            <div id='site_box'>
                                <a href="https://programmers.co.kr/">프로그래머스</a></div>
                            <div id='site_box'>
                                <a href="https://www.inflearn.com/">Inflearn</a></div>
                            <input id='next' type="button" value="▶"></input>
                        </div>
                        <p class='small_title'>진행중인 캠프</p>
                        <div id='main_camp'>
                            <input id='next' type="button" value="◀"></input>
                            <div id='site_box' style={{ paddingTop: "18px" }}>
                                <a href="https://woowacourse.github.io/">우아한 테크코스</a></div>
                            <div id='site_box' style={{ paddingTop: "18px" }}>
                                <a href="https://codestates.com/">코드스테이츠 부트캠프</a></div>
                            <div id='site_box'>
                                <a href="https://www.vanillacoding.co/">바닐라 코딩</a></div>
                            <div id='site_box'>
                                <a href="https://wecode.co.kr/">위코드</a></div>
                            <div id='site_box' style={{ paddingTop: "18px" }}>
                                <a href="https://class.likelion.net/">멋쟁이<br></br>사자처럼</a></div>
                            <div id='site_box' style={{ paddingTop: "18px" }}>
                                <a href="https://spartacodingclub.kr/curriculum/web">스파르타<br></br>코딩클럽</a></div>
                            <div id='site_box' style={{ paddingTop: "18px" }}>
                                <a href="https://www.inflearn.com/">제주 코딩 베이스 캠프</a></div>
                            <input id='next' type="button" value="▶"></input>
                        </div>
                        <p class='small_title'>채용중인 회사</p>
                        <div id='main_career'>
                            <input id='next' type="button" value="◀"></input>
                            <div id='site_box'>
                                <a href="https://careers.google.com/c/">Google</a></div>
                            <div id='site_box'>
                                <a href="https://careers.kakao.com/index">kakao</a></div>
                            <div id='site_box'>
                                <a href="https://www.samsungcareers.com/main.html">삼성전자</a></div>
                            <div id='site_box'>
                                <a href="https://careers.sktelecom.com/skRecruitAnnounce/doing">SKT</a></div>
                            <div id='site_box'>
                                <a href=""></a></div>
                            <div id='site_box'>
                                <a href=""></a></div>
                            <div id='site_box'>
                                <a href=""></a></div>
                            <input id='next' type="button" value="▶"></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default Main;
