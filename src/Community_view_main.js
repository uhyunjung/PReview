import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db } from './firebase.js';

class Community_view_main extends Component {
    // 렌더링 후 완료
    getUrlParams() {
        let params = {};
        params["search_exist"] = false;

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
                                            <a href='/Camp_review_detail?board="+board+"&id="+doc.id+"'><div class=\"title\">"+doc.data().title+"</div></a>\
                                            </div>\
                                            <div class=\"like\">\
                                                <span class=\"date\">"+doc.data().date+"</span>\
                                                <div class=\"likebtn\">\
                                                    <i class=\"fas fa-heart\">♥</i>\
                                                <div class=\"likepeople\">"+doc.data().like+"</div>\
                                                </div>\
                                            <span class=\"writer\">작성자 : "+doc.data().writer_id+"</span>\
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
                            <span>{board}</span>
                        </div>
                        <div>
                            <form class="search">
                                <input class="keyword" type="text" name="search" size="80"></input>
                            </form>
                        </div>
                        <Link to={'/Community_review_write?board='+board}><Button id='write_btn' variant="outlined" type="submit">글작성</Button></Link>
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
