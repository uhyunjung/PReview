import React, { Component } from 'react';
import './total.css';

class Main extends Component {
    // 렌더링
    render() {
        return (
            <div className="Main">
                <div id='main_left'>
                    <div id='schedule'>
                        <article id="mainarticle">
                            <p id='small_title_cal'>12월의 일정</p>
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

                    <div id='schedule2'>
                        <h4 style={{ color: "green", display: "inline-block" }}>● </h4>
                        <h4 style={{ color: "#585858", display: "inline-block" }}>대회 </h4>
                        <h4 style={{ color: "#purple", display: "inline-block" }}>● </h4>
                        <h4 style={{ color: "#585858", display: "inline-block" }}>캠프 </h4>
                        <h4 style={{ color: "#orange", display: "inline-block" }}>● </h4>
                        <h4 style={{ color: "#585858", display: "inline-block" }}>채용 </h4>
                    </div>
                    <div id='schedule3'>
                        <p> ◦ 1일 2020 E-PEER</p>
                        <p> ◦ 5일 Google 코딩 부트 캠프</p>
                        <p> ◦ 11일 2020 하반기 삼성전자 공채</p>
                        <p> ◦ 13일 Google CodeJam</p>
                        <p> ◦ 19일 Sk c&c 딥러닝 R&D</p>
                    </div>
                </div>


                <div id='main_right_top'>
                    <p id='small_title'>인기 게시물</p>
                    <nav id='nav2'>
                        <ul>
                            <li id='nav_item2' style={{ borderLeft: "none" }}><a href="">강의 리뷰</a></li>
                            <li id='nav_item2'><a href="">코딩 캠프 리뷰</a></li>
                            <li id='nav_item2'><a href="">솔루션 공유</a></li>
                            <li id='nav_item2'><a href="">커뮤니티 </a> </li>
                        </ul>
                    </nav>
                    <hr id="line"></hr>
                    <p style={{ textAlign: "right", color: "gray", fontSize: "x-small", marginRight: "10px" }}>더보기</p>
                    <ul>
                        <li id='main_post_item' ><a href="">[백준 알고리즘]알고리즘 공부를 한다면 한번쯤은 꼭! 코딩계의 정석 너낌!?!?</a></li>
                        <li id='main_post_item' ><a href="">[모두를 위한 딥러닝]기초 다지기에 조아요! 근데 들어도 뭔소린지 모르겟는 ㅎㅎ</a></li>
                        <li id='main_post_item' ><a href="">[초보자도 만들 수 있는 애픒 스크롤]요즘 트렌디한 웹디자인 꿀팁들 많아용! 초급자들은 어려울듯 ㅠㅜ</a></li>
                        <li id='main_post_item' ><a href="">[파이썬 딥러닝 영상처리]결과가 나올때만 재밌어요ㅎㅎ OpenCV 차근차근 잘 설명해주는 편이에요</a></li>
                        <li id='main_post_item' ><a href="">[블록체인 DAAP 이더리움]블록체인 관련 강의들은 뜬구름 잡는 느낌이었는데 이 강의 듣고 개념 정리 싹 됏어용!</a></li>

                    </ul>
                </div>
                <div id='main_right_bottom'>
                    <p id='small_title'>프로그래밍 강의 사이트</p>
                </div>
            </div>
        )
    };
}

export default Main;
