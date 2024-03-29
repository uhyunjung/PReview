import React, { Component } from 'react';
import firebase from '../api/firebase';
import { Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import '../total.css';
import { db } from '../api/firebase';

class Camp_review_detail extends Component {
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

        this.comments = [];

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

    editDate(date){
        let today = new Date();
        let curr = today.toLocaleString().substring(0, 13);

        let ret;
        if(date.indexOf(curr) != -1) ret = date.substring(14, date.length);
        else ret = date.substring(0, 14);

        console.log(ret);

        return ret;
    }

    likeUpdate() {
        let params = this.getUrlParams();
        let edit = this.state.items.like;
        console.log(edit);

        db.collection("postings").doc(params.id).update({
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
        let review = db.collection("postings").doc(params.id);
        this.setState({ posting_id: review.id });

        review.get().then(res => {
            this.setState({ items: res.data() });
        });
    }
    // 렌더링 후 완료
    componentDidMount = () => {
        {
            let params = this.getUrlParams();
            let review = db.collection("postings").doc(params.id).get().then(doc => {
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
                .orderBy("date", "asc")
                .onSnapshot(snaps => {
                    snaps.forEach(doc => {
                        let posting = doc.data().posting_id;
                        if (posting == this.state.posting_id && this.comments.indexOf(doc.id) == -1) {
                            this.comments.push(doc.id);
                            const commentDiv = document.createElement("div");

                            let htmlContent;

                            db.collection("users").doc(doc.data().commentWriter_id).get()
                                .then(ret => {
                                    console.log(doc.data().commentWriter_id);
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
        "<div class=\"comment_item\">\
        <ul>\
            <li class=\"item\">\
                <div class=\"comment_nickname\">"+ name + "</div>\
                <div class=\"comment_comment\">"+ content + "</div>\
                <div class=\"comment_date\">"+ this.editDate(date) + "</div>\
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
            let review = db.collection("postings").doc(params.id);

            db.collection("postings").doc(review.id).delete()
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
        let editUrl ="/Camp_review_edit?board="+board+"&id="+params.id;

        // 렌더링
        return (
            <div className="Camp_review_detail" class="main_body">

<div class="main_left">
                <ul class="category_camp" style={{marginBottom: "0"}}>
                    <li><a href="/Camp_review_main?board=알고리즘">알고리즘</a></li>
                    <li><a href="/Camp_review_main?board=웹프로그래밍">웹프로그래밍</a></li>
                    <li><a href="/Camp_review_main?board=데이터 분석">데이터분석</a></li>
                    <li><a href="/Camp_review_main?board=AI">AI</a></li>
                </ul>
                <div class='schedule'>
                    <article class="mainarticle">
                        <p class='small_title_cal'>12월의 일정</p>
                        <table class="tg">
                            <thead>
                                <tr>
                                    <th class="sunday">일</th>
                                    <th class="weekday">월</th>
                                    <th class="weekday">화</th>
                                    <th class="weekday">수</th>
                                    <th class="weekday">목</th>
                                    <th class="weekday">금</th>
                                    <th class="saturday">토</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day" style={{ color: "#27a23c" }}>●</td>
                                    <td class="day"></td>
                                </tr>
                                <tr>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day" style={{ color: "#725ef1" }}>●</td>
                                    <td class="day"></td>
                                    <td class="day" style={{ color: "#27a23c" }}>●</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td style={{ color: "#725ef1" }}>●</td>
                                    <td class="day"></td>
                                    <td class="day" style={{ color: "#eb9615" }}>●</td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                </tr>
                                <tr>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day" style={{ color: "#eb9615" }}>●</td>
                                </tr>
                                <tr>
                                    <td class="day"></td>
                                    <td class="day" style={{ color: "#725ef1" }}>●</td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day"></td>
                                    <td class="day" style={{ color: "#27a23c" }}>●</td>
                                    <td class="day"></td>
                                </tr>
                            </tbody>
                        </table>
                    </article>
                </div>
                <br></br>
                <div class='schedule2'>
                    <h4 style={{ color: "#725ef1", display: "inline-block" }}>● </h4>&nbsp;
                    <h4 style={{ color: "#585858", display: "inline-block" }}> 캠프 </h4>&nbsp;
                </div>
                <div class='schedule3'>
                    <p> ◦ 7일 SSAFY 지원 마감</p>
                    <p> ◦ 11일 Naver 부스트캠프 지원 시작</p>
                    <p> ◦ 25일 우아한테크캠프 최종 발표</p>
                </div>
            </div>

                <article class="article">
                    <Paper classname="paper" elevation={3}>
                        <div id="detail">
                            <div class="category_name category_name_write_page">{board}</div>
                            <section id="lecture-name" class="lecturename writing-block">
                                <div class="item" style={{width:"100%"}}>
                                    <div class="review-entry" style={{fontSize:"1em", textAlign:"left", width:"100%" }}>
                                        <span>{item.title}</span>
                                    </div>

                                    <div class="writer_info">
                                        <span class="writer">{item.writer_name}</span>
                                        <span class="date">{this.editDate(String(item.date))}</span>
                                    </div>
                                </div>
                            </section>
                            <section id="contants" class="writing-block">
                                <div class="posting-content">
                                    <pre>{item.content}</pre>
                                </div>

                                <div>
                                    {this.state.isUid ? (
                                        <>
                                            <section id="submit-button">
                                            <a href={editUrl}><Button variant="outlined" style={{ marginRight: "1vw" }} id='update_btn'>수정</Button></a>
                                                <Button variant="outlined" id="delete_btn" onClick={this.handleClickOpen}>삭제</Button>
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
                                                        <Link to={'/Camp_review_main?board=' + item.board}><Button type="submit" onClick={this.deleteReview} color="primary" autoFocus>확인</Button></Link>
                                                    </DialogActions>
                                                </Dialog>
                                            </section>
                                        </>) : (
                                            <>
                                            </>)}

                                </div>

                            </section>
                            <div class="comment_header">
                                <div class="comment_title">댓글</div>
                                <div class="like1">
                                    <button class="like" onClick={() => { this.likeUpdate() }}><i class="far fa-heart">♥</i></button>
                                    <span class="likepeople">{item.like}</span>
                                </div>
                            </div>

                            <div class="comment_content">
                                <div id="comment">
                                    <form className="form" onSubmit={this.handleSubmitComment}>
                                        <input id="comment_input" type="text" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })}></input>
                                        <Button variant="outlined" type="submit" id="comment_btn" onClick={this.handleSubmitComment}>댓글 작성</Button>
                                    </form>
                                </div>

                                <div class="comment_list" ref={(DOMNodeRef) => {
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

export default Camp_review_detail;
