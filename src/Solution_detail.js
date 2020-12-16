import React, { Component } from 'react';
import firebase from './firebase';
import { Select, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './total.css';
import { db, auth } from './firebase';

class Solution_detail extends Component {
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
            open: false,
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

    likeUpdate() {
        let params = this.getUrlParams();
        let edit = this.state.items.like;
        console.log(edit);

        db.collection("solution").doc(params.id).update({
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
        let review = db.collection("solution").doc(params.id);
        this.setState({ posting_id: review.id });

        review.get().then(res => {
            this.setState({ items: res.data() });
        });
    }
    // 렌더링 후 완료
    componentDidMount = () => {
        {
            let params = this.getUrlParams();
            let review = db.collection("solution").doc(params.id).get().then(doc => {
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
                .orderBy("date", "desc")
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
                                    if ((commentDiv!=null)&&(this.myRef != null)) {
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
            if (firebase.auth().currentUser) {
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

                this.setState({ content: "" });
            }
            else {
                alert("로그인을 먼저 해주세요");
            }
        }
    }

    deleteReview = () => {
        {
            let params = this.getUrlParams();
            let review = db.collection("solution").doc(params.id);

            db.collection("solution").doc(review.id).delete()
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
            <div className="Camp_review_detail">
                <div className="sidebar">
                    <aside class="sidebar">
                        <ul class="category_camp">
                            <li><a href="/Solution_main?board=알고리즘">솔루션</a></li>
                        </ul>
                    </aside>
                </div>
                <article>
                    <Paper classname="paper" elevation={3}>
                        <div id="review_header">
                            <div id="review_title">{item.title}</div>
                            <div id="writer_info">
                                <span id="writer">{item.writer_name}</span>
                                <span id="date">{item.date}</span>
                            </div>
                        </div>
                        <hr id="line" />
                        <div id="review_content">
                            {item.content}
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

                        <hr id="line" />

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
                    </Paper>
                </article>
            </div>
        );
    }
}

export default Solution_detail;
