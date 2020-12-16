import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db } from './firebase.js';

class Community_view_main extends Component {
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

            db.collection("community")
            .orderBy(params.order_by,"desc")
            .onSnapshot(snaps => {
                snaps.forEach(doc => {
                    let title = doc.data().title.toLowerCase();
                    console.log(title);
                    if (params.board == doc.data().board || (params.search_exist && title.indexOf(search) != -1)){
                        const reviewDiv = document.createElement("div");

                        const htmlContent =
                            "<div class=\"review\">\
                                <ul>\
                                    <li class=\"item\">\
                                        <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                        <div class=\"info\">\
                                            <a href='/Community_view_detail?board="+board+"&id="+doc.id+"'><div class=\"title\">"+doc.data().title+"</div></a>\
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
        let board = params.search_exist ? "커뮤니티" : decodeURI(params.board)

        return (
            <div className="Lecture_review_main" class="main_body">
                <div class='main_left'>
                    <ul class="category_camp">
                        <li><a href="/Community_view_main?board=자유게시판">자유게시판</a></li>
                        <li><a href="/Community_view_main?board=질문게시판">질문게시판</a></li>
                        <li><a href="/Community_view_main?board=강의 수강원 모집">강의 수강원 모집</a></li>
                        <li><a href="/Community_view_main?board=프로젝트 참가자 모집">프로젝트 참가자 모집</a></li>
                    </ul>
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
                        <Link to={'/Community_view_write?board='+board}><Button id='write_btn' variant="outlined" type="submit">글작성</Button></Link>
                    </div>

                    <div class="header">
                    <span>제목</span>
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span> </span>
                        <span>작성자</span>
                        <div class="btn">
                            <button><a href={"/Community_view_main?board="+board}>작성날짜△</a></button>
                        </div>
                        <div class="btn">
                            <button><a href={"/Community_view_main?board="+board+"&order_by=like"}>좋아요△</a></button>
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

export default Community_view_main;
