import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db } from './firebase.js';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Lecture_review_main extends React.Component {
    constructor(props) {
        super(props);

        this.myRef = React.createRef();

        this.lectureList = [];

        this.dataPoints = [];

        this.options = [];
    }

    getUrlParams() {
        let params = {};
        params["search_exist"] = false;
        params["order_by"] = "date"

        let exist = false;
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; params[key+"_exist"] = true;});

        return params;
    }

    editDate(date){
        let today = new Date();
        let curr = today.toLocaleString().substring(0, 13);

        let ret;
        if(date.indexOf(curr) != -1) ret = date.substring(14, date.length);
        else ret = date.substring(0, 14);

        return ret;
    }

    // 렌더링 후 완료
    componentDidMount = () => {
        {
            let params = this.getUrlParams();
            let search;
            if(params.search_exist) {
                search = decodeURI(params.search).toLowerCase();
            }
            let board = decodeURI(params.board);

            db.collection("reviews")
            .orderBy(params.order_by, "desc")
            .onSnapshot(snaps => {
                snaps.forEach(doc => {
                    let lec_name = doc.data().lecture_name.toLowerCase();

                    if (params.board == doc.data().board || (params.search_exist && lec_name.indexOf(search) != -1)){
                        if(this.lectureList.indexOf(doc.data().lecture_name) != -1){
                            this.dataPoints.forEach(dp => {
                                if(dp.label == doc.data().lecture_name){
                                    dp.y += Number(doc.data().star);
                                }
                            })
                            
                        }
                        else {
                            this.lectureList.push(doc.data().lecture_name);
                            this.dataPoints.push({label: doc.data().lecture_name, y: Number(doc.data().star)});
                        }

                        const reviewDiv = document.createElement("div");

                        let htmlContent =
                            "<div class=\"review\">\
                                <ul>\
                                    <li class=\"item\">\
                                        <div id='site_box'>\
                                            <a href="+doc.data().link+">Link</a>\
                                        </div>\
                                        <div class=\"info\">\
                                            <a href='/Lecture_review_detail?board="+board+"&id="+doc.id+"'><div class=\"title\">"+ doc.data().lecture_name + "</div></a>\
                                            <div class=\"rank\">"+ this.printStar(doc.data().star) + "</div>\
                                            <div class=\"tag\">"+ doc.data().tags + "</div>\
                                            <Button onClick=\"location.href='/Lecture_review_main?search="+doc.data().lecture_name+"'\" variant=\"outlined\" id=\"moa_btn\" color=\"primary\" type=\"submit\">이 강의만 모아보기</Button>\
                                        </div>\
                                        <div class=\"info_side\">\
                                            <span class=\"date\">"+ this.editDate(doc.data().date) + "</span>\
                                            <div class = \"center\">\
                                                <div class=\"like2\">\
                                                    <i>♥</i>\
                                                    <div class=\"likepeople2\">"+ doc.data().like + "</div>\
                                                </div>\
                                                <span class=\"writer\">"+ doc.data().writer_name + "</span>\
                                            </div>\
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

            this.render();
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

    // 렌더링
    render() {
        let params = this.getUrlParams();
        let board = params.search_exist ? "강의 리뷰" : decodeURI(params.board)

        const options = {
            height: 260,
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            dataPointMaxWidth: 30,
            axisY: {
                title: "Star",
                minimum: 0,
                maximum: 5,
                interval: 1
            },
            axisx: {
                labelAutoFit: true,
            },
            data: [{
                type: "bar",
                dataPoints: this.dataPoints
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
                <article class="article" style={{width: "43vw"}}>
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
                                <Link to={'/Lecture_review_write?board='+board}><Button variant="contained" type="submit" id="write_btn">글작성</Button></Link>
                            </div>
                        </div>
                        <div class="chart">
                            <CanvasJSChart options = {options} />
                        </div>
                        <div class="header">
                            <span>링크</span>
                            <span>내용</span>
                            <div class="btn">
                            <button><a href={"/Lecture_review_main?board="+board}>작성날짜△</a></button>
                            <button><a href={"/Lecture_review_main?board="+board+"&order_by=like"}>좋아요△</a></button>
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
