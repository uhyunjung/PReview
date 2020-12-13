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

        // 렌더링
        return (
            <div className="Lecture_review_detail">
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
                <article>
                    <Paper classname="paper" elevation={3}>
                        <div id="detail">
                            <div class="lecturename">
                                <div class="category_name">Full Stack</div>
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
