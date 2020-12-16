import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db } from './firebase.js';
import { ContactsOutlined } from '@material-ui/icons';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Lecture_review_main extends React.Component {
    Constructor(props) {
        this.myRef = React.createRef();
    }

    getUrlParams() {
        let params = {};
        params["search_exist"] = false;

        let exist = false;
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; params[key+"_exist"] = true;});

        return params;
    }

    // 렌더링 후 완료
    componentDidMount = () => {
        {
            console.log("bddd");
            let params = this.getUrlParams();
            let search;
            if(params.search_exist) {
                search = decodeURI(params.search).toLowerCase();
                if(search.indexOf(23))
                {
                    search = search.replace("%23", "#");
                }
                console.log(search);
            }
            console.log(params.board);
            let board = decodeURI(params.board);
            console.log(board);

            db.collection("reviews")
            .orderBy("date","desc")
            .onSnapshot(snaps => {
                snaps.forEach(doc => {
                    let lec_name = doc.data().lecture_name.toLowerCase();
                    let tag_name = doc.data().tags;
                    console.log(doc);
                    if (params.board == doc.data().board || (params.search_exist && lec_name.indexOf(search) != -1) || (params.search_exist && tag_name.indexOf(search) != -1)){
                        
                        const reviewDiv = document.createElement("div");

                        let htmlContent =
                            "<div class=\"review\">\
                                <ul>\
                                    <li class=\"item\">\
                                        <div id='site_box'>\
                                            <a href=\"https://www.acmicpc.net/\">백준</a>\
                                        </div>\
                                        <div class=\"info\">\
                                            <a href='/Lecture_review_detail?board="+board+"&id="+doc.id+"'><div class=\"title\">"+ doc.data().lecture_name + "</div></a>\
                                            <div class=\"rank\">"+ this.printStar(doc.data().star) + "</div>\
                                            <div class=\"tag\">"+ doc.data().tags + "</div>\
                                            <Button onClick=\"location.href='/Lecture_review_main?search="+doc.data().lecture_name+"'\" variant=\"outlined\" color=\"primary\" type=\"submit\">이 강의만 모아보기</Button>\
                                        </div>\
                                        <div class=\"like\">\
                                            <span class=\"date\">"+ doc.data().date + "</span>\
                                            <div class=\"likebtn\">\
                                                <i class=\"fas fa-heart\">♥</i>\
                                                <div class=\"likepeople\">"+ doc.data().like + "</div>\
                                            </div>\
                                            <span class=\"writer\">작성자 : "+ doc.data().writer_name + "</span>\
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
   
    printStar(star) {
        let ret = "";

        for (let i = 0; i < 5; i++) {
            if (i < star) ret += "★";
            else ret += "☆";
        }

        return ret;
    }

    makeChartContent() {
        let dataPoints = [];
        let DP;

        db.collection("lecture").orderBy("review_num", "desc")
        .onSnapshot(snaps => {
            snaps.forEach(doc => {
                DP = {y: doc.data().star, label: doc.data().name};
                dataPoints.push(DP);
            })
        })

        console.log(dataPoints);

        return dataPoints;
    }

    // 렌더링
    render() {
        let params = this.getUrlParams();
        let board = params.search_exist ? "강의 리뷰" : decodeURI(params.board)
        let DP = this.makeChartContent()
        const options = {
            height: 260,
            width: 600,
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            axisY: {
                title: "Star",
                minimum: 0,
                maximum: 5,
                interval: 1
            },
            data: [{        
                type: "column",  
                showInLegend: true, 
                legendMarkerColor: "grey",
                legendText: "MMbbl = one million barrels",
                dataPoints: DP
            }]
        }
        
        return (
            <div className="Lecture_review_main" class="main_body">
                <div className="sidebar">
                    <aside class="sidebar">
                        <p>언어</p>
                        <ul class="category">
                            <li><a href="/Lecture_review_main?board=C/C++">C/C++</a></li>
                            <li><a href="/Lecture_review_main?board=C#">C#</a></li>
                            <li><a href="/Lecture_review_main?board=Java">Java</a></li>
                            <li><a href="/Lecture_review_main?board=Python">Python</a></li>
                            <li><a href="/Lecture_review_main?board=Javascript">Javascript</a></li>
                        </ul>
                        <p>분야</p>
                        <ul class="category">
                            <li><a href="/Lecture_review_main?board=Algorithm">Algorithm</a></li>
                            <li><a href="/Lecture_review_main?board=FrontEnd">FrontEnd</a></li>
                            <li><a href="/Lecture_review_main?board=Server">Server</a></li>
                            <li><a href="/Lecture_review_main?board=Database">Database</a></li>
                            <li><a href="/Lecture_review_main?board=ML/DL">ML/DL</a></li>
                        </ul>
                    </aside>
                </div>
                <article class="article">
                    <Paper classname="paper" elevation={2}>
                        <div class="review_search">
                            <div class="category_name">
                            <span>{board}</span>
                            </div>
                            <form class="search">
                                <button>
                                    <i class="fas fa-search"></i>
                                </button>
                                <input class="keyword" type="text" name="search" size="80" placeholder="게시판에서 검색"></input>
                            </form>
                            <div class="write_button">
                                <Link to={'/lecture_review_write?board='+board}><Button variant="contained" type="submit" id="write_btn">글 작성</Button></Link>
                            </div>
                        </div>
                        <div class="chart">
                            <CanvasJSChart options = {options} />
                        </div>
                        <div class="header">
                            <span>링크</span>
                            <span>내용</span>
                            <div class="btn">
                                <button value="date" onClick={(e)=>this.order(e.target.value)}>작성날짜△</button>
                                <button value="like" onClick={(e)=>this.order(e.target.value)}>좋아요</button>
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
