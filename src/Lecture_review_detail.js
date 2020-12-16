import React, { Component } from 'react';
import { Select, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import './total.css';
import { db, auth } from './firebase';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
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
            open: false,
            isUid: false,
            items: [],
            content: "",
            commentWriter_id: "",
            posting_id: "",
            date: new Date(),
            commentName: "",
            uid: "",
            new_comment: ""
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
            let params = this.getUrlParams();
            let review = db.collection("reviews").doc(params.id).get().then(doc => {
                firebase.auth().onAuthStateChanged(function (user) {
                    {
                        if (user) {
                            this.setState({ uid: firebase.auth().currentUser.uid });

                            if (doc.data().writer_id == this.state.uid) {
                                this.setState({ isUid: true });
                            }
                            else {
                                this.setState({ isUid: false });
                            }
                        }
                        else {
                            alert("로그인을 먼저 해주세요");
                        }
                    }
                }.bind(this)).bind(this);
            });

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

                                    console.log(this.state.new_comment);
                                    console.log(doc.id);

                                    if (this.myRef != null && this.state.new_comment == "" || this.state.new_comment == doc.id) {
                                        this.myRef.appendChild(commentDiv);
                                        console.log("add!");
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
            .then((commentRef) => {
                this.setState({ new_comment: commentRef.id });
            })
            .catch((error) => {
                alert(error.message);
            });
        }

    }

    deleteReview = () => {
        {
            let params = this.getUrlParams();
            let review = db.collection("reviews").doc(params.id);

            db.collection("reviews").doc(review.id).delete()
                .then(() => {
                })
                .catch((error) => {
                    alert(error.message);
                });


        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        let item = this.state.items;

        let params = this.getUrlParams();
        let board = decodeURI(params.board);

        // 렌더링
        return (
            <div className="Lecture_review_detail" class="main_body">
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
                <article class="article">
                    <Paper classname="paper" elevation={3}>
                        <div id="detail">
                            <div class="category_name category_name_write_page">{board}</div>
                            <section id="lecture-name" class="lecturename writing-block">
                                <div class="item">
                                    <div class="review_title">
                                        <span>{item.lecture_name}</span>
                                    </div>

                                    <div class="writer_info">
                                        <span class="writer">{item.writer_name}</span><br></br>
                                        <span class="date">{item.date}</span>
                                    </div>
                                </div>
                            </section>

                            <section id="contants" class="writing-block">
                                <div class="star" class="item">
                                    <div class="review-entry">
                                        <span class="entry-name">별점</span>
                                    </div>
                                    <div class="review-content">
                                        <span>{this.printStar(item.star)}</span>
                                    </div>
                                </div>
                                <div id="hashtags" class="item">
                                    <div class="review-entry">
                                        <span class="entry-name">태그</span>
                                    </div>
                                    <div class="review-content">
                                        <span>{item.tags}</span>
                                    </div>
                                </div>
                                <div id="lecture-info" class="item">
                                    <div class="review-entry">
                                        <span class="entry-name">수강 정보</span>
                                    </div>
                                    <div class="review-content">
                                        <span>수강 기간 : {item.period}</span>
                                        <span> / 수강 비용 : 월 {item.cost}원</span>
                                    </div>
                                </div>
                                <div id="pros" class="item">
                                    <div class="review-entry">
                                        <span class="entry-name">장점</span>
                                    </div>
                                    <div class="review-content-normal">
                                        <span>{item.pros}</span>
                                    </div>
                                </div>
                                <div id="cons" class="item">
                                    <div class="review-entry">
                                        <span class="entry-name">단점</span>
                                    </div>
                                    <div class="review-content-normal">
                                        <span>{item.cons}</span>
                                    </div>
                                </div>
                                <div>
                                    {this.state.isUid ? (
                                        <>
                                            <section id="submit-button">
                                                <Button variant="outlined" onClick={this.handleClickOpen}>삭제</Button>
                                                <Dialog
                                                    open={this.state.open}
                                                    onClose={this.handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"리뷰 삭제"}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            리뷰를 삭제하시겠습니까?
                                                    </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={this.handleClose} color="primary">취소</Button>
                                                        <Link to={'/lecture_review_main?board=' + item.board}><Button type="submit" onClick={this.deleteReview} color="primary" autoFocus>확인</Button></Link>
                                                    </DialogActions>
                                                </Dialog>
                                            </section>
                                        </>) : (
                                            <>
                                            </>)}
                                </div>

                                <button class="go">강의 바로가기</button>
                            </section>
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

                                <div id="comment_list" class="item" ref={(DOMNodeRef) => {
                                    this.myRef = DOMNodeRef;
                                }}></div>
                            </div>
                        </div>
                    </Paper>
                </article>
            </div >
        );
    }
}

export default Lecture_review_detail;
