import React, { Component } from 'react';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db, auth } from './firebase';
import { ControlPointDuplicateOutlined } from '@material-ui/icons';

class Lecture_review_detail extends Component {
    // Paper 태그 스타일
    styles = ({ spacing: { unit } }) => ({
        paper: {
            margin: `${unit * 3}px auto`,
            padding: unit * 2,
            maxWidth: 400
        }
    })

    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
    }

    printStar(star) {
        let ret = "";

        for(let i=0; i<5; i++){
            if(i < star) ret += "★";
            else ret += "☆";
        }
        
        return ret;
    };

    getUrlParams() {
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
        return params;
    }

    componentWillMount() {
        let params = this.getUrlParams();
        let review = db.collection("reviews").doc(params.id);

        review.get().then(res => {
            this.setState({items: res.data()});
        });
    }

    render() {
        let item = this.state.items;

        let params = this.getUrlParams();
        let board = decodeURI(params.board);

        // 렌더링
        return (
            <div className="Lecture_review_detail">
                <div className="sidebar">
                    <aside class="sidebar">
                        <p>언어</p>
                        <ul class="category">
                            <li><a href="/Lecture_review_main?board=C/C++">C / C++</a></li>
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
                <article>
                    <Paper classname="paper" elevation={3}>
                        <div id="detail">
                            <div class="lecturename">
                                <div class="category_name">{board}</div>
                                    <span>{item.lecture_name}</span>
                                <div class="writer_info">
                                    <span class="writer">{item.writer_id}</span><br></br>
                                    <span class="date">{item.date}</span>
                                </div>
                            </div>
                            <div class="reviewdetail">
                                <div class="star">
                                    <span>별점</span>
                                    <span>{this.printStar(item.star)}</span>
                                </div>
                                <div class="tags">
                                    <span>태그</span>
                                    <span>{item.tags_attribute}</span>
                                </div>
                                <div class="lecture_info">
                                    <span>수강 정보</span>
                                    <span class="period">수강 기간: {item.period}</span>
                                    <span class="cost">수강 비용 : 월 {item.cost}원</span>
                                </div>
                                <div class="pros">
                                    <span>장점</span>
                                    <span>{item.pros}</span>
                                </div>
                                <div class="cons">
                                    <span>단점</span>
                                    <span>{item.cons}</span>
                                </div>
                                <button class="go">강의 바로가기</button>
                            </div>
                        </div>
                    </Paper>
                </article>
            </div>
        );
    }
}

export default Lecture_review_detail;
