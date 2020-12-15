import React, { Component } from 'react';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db, auth } from './firebase';
import firebase from 'firebase';
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
            items: [],
            content: "",
            commentWriter_id: "",
            posting_id: "",
            date: new Date()
        };
    }

    printStar(star) {
        let ret = "";

        for (let i = 0; i < 5; i++) {
            if (i < star) ret += "★";
            else ret += "☆";
        }

        return ret;
    };

    getUrlParams() {
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });
        return params;
    }

    componentWillMount() {
        let params = this.getUrlParams();
        let review = db.collection("reviews").doc(params.id);

        review.get().then(res => {
            this.setState({ items: res.data() });
        });
    }
    // 데이터 저장
    handleSubmitComment = (e) => {
        e.preventDefault();

        // 빈칸 방지
        if (this.state.content == null) {
            return;
        }
        else {
            db.collection("comments").add({
                commentWriter_id: firebase.auth().currentUser.uid,
                content: this.state.content,
                posting_id: this.state.posting_id,
                date: this.state.date.toLocaleString()
            })
                .then(() => {
                })
                .catch((error) => {
                    alert(error.message);
                });
        }

        this.setState({ content: "" });
    }

    render() {
        let item = this.state.items;
        let params = this.getUrlParams();

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
                                <div class="category_name">{params.board}</div>
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

                            <div class="comment_header">
                                <div class="comment_title">댓글</div>
                                <div>
                                    <button class="like"><i class="far fa-heart">♥</i></button>
                                    <span class="likepeople">{item.like}</span>
                                </div>
                            </div>

                            <div class="comment_content">
                                <div id="comment">
                                    <form className="form" onSubmit={this.handleSubmitComment}>
                                        <input id="input" type="text" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value, posting_id: item.writer_id })}></input>
                                        <Button variant="contained" type="submit" onClick={this.handleSubmitComment}>댓글 작성</Button>
                                    </form>
                                </div>
                                <div class="item">
                                    <div class="comment_nickname">닉네임 1</div>
                                    <div class="comment_content">와 정말 유익한 후기!</div>
                                    <div class="comment_date">2020/11/7</div>
                                    <div class="comment_time">17:35:55</div>
                                </div>

                                <div class="item">
                                    <div class="comment_nickname">닉네임 2</div>
                                    <div class="comment_content">저도 들어봐야겠어요!</div>
                                    <div class="comment_date">2020/11/7</div>
                                    <div class="comment_time">17:50:43</div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </article>
            </div>
        );
    }
}

export default Lecture_review_detail;
