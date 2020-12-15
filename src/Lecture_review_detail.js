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

        this.myRef = React.createRef();

        this.state = {
            isUid: false,
            items: [],
            content: "",
            commentWriter_id: "",
            posting_id: "",
            date: new Date(),
            commentName: "",
            uid: ""
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

    likeUpdate() {
        let params = this.getUrlParams();
        let edit = this.state.items.like;
        console.log(edit);

        db.collection("reviews").doc(params.id).update({
            'like': edit + 1
        }).then(() => {
            window.location.reload(false);
        })
    }

    getUrlParams() {
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });
        return params;
    }

    componentWillMount() {
        let params = this.getUrlParams();
        let review = db.collection("reviews").doc(params.id);
        this.setState({ posting_id: review.id });

        review.get().then(res => {
            this.setState({ items: res.data() });
        });
    }
    
    // 렌더링 후 완료
    componentDidMount = () => {
        {
            if(firebase.auth().currentUser!=null){
                {
                    this.setState({ uid: firebase.auth().currentUser.uid });
                    
                    if (this.state.items.writer_id == this.state.uid) {
                        this.setState({ isUid: true });
                    }
                    else {
                        this.setState({ isUid: false });
                    }
                }
            };
            
            db.collection("comments")
                .onSnapshot(snaps => {
                    snaps.forEach(doc => {
                        let posting = doc.data().posting_id;
                        if (posting == this.state.posting_id) {
                            const commentDiv = document.createElement("div");

                            let htmlContent;

                            db.collection("users").doc(doc.data().commentWriter_id).get()
                            .then(ret => {
                                this.setState({ commentName: ret.data().nickname });
                                //console.log(ret.data().nickname);
                                htmlContent = this.MakeHTMLContent(ret.data().nickname, doc.data().content, doc.data().date);

                                commentDiv.innerHTML = htmlContent;
                                if (this.myRef != null) {
                                this.myRef.appendChild(commentDiv);
                            }
                            })
                        }
                    })
                })
        }
    }

    MakeHTMLContent(name, content, date) {
        let htmlContent =
            "<div class=\"review\">\
            <ul>\
                <li class=\"item\">\
                    <div class=\"comment_nickname\">"+ name + "</div>\
                    <div class=\"comment_content\">"+ content + "</div>\
                    <div class=\"comment_date\">"+ date + "</div>\
                </li>\
            </ul>\
        </div>";

        return htmlContent
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

    deleteReview = () => {
        {
            db.collection("reviews").doc(this.state.uid).delete()
                .then(() => {
                })
                .catch((error) => {
                    alert(error.message);
                });


        };
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
                                    <span>{item.tags}</span>
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
                                <div>
                                    {this.state.isUid ? (
                                        <>
                                            <Button variant="outlined" onClick={this.deleteReview}>삭제</Button>
                                        </>) : (
                                            <>
                                            </>)}
                                </div>

                                <button class="go">강의 바로가기</button>
                            </div>

                            <div class="comment_header">
                                <div class="comment_title">댓글</div>
                                <div>
                                    <button class="like" onClick={() => { this.likeUpdate() }}><i class="far fa-heart">♥</i></button>
                                    <span class="likepeople">{item.like}</span>
                                </div>
                            </div>

                            <div class="comment_content">
                                <div id="comment">
                                    <form className="form" onSubmit={this.handleSubmitComment}>
                                        <input id="input" type="text" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })}></input>
                                        <Button variant="contained" type="submit" onClick={this.handleSubmitComment}>댓글 작성</Button>
                                    </form>
                                </div>

                                <div class="item" ref={(DOMNodeRef) => {
                                    this.myRef = DOMNodeRef;
                                }}></div>

                            </div>
                        </div>
                    </Paper>
                </article>
            </div>
        );
    }
}

export default Lecture_review_detail;
