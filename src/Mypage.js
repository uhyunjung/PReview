import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Snackbar, Select, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import { db } from './firebase.js';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import './total.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

class Mypage extends Component {

    Constructor() {
        this.myRef = React.createRef();

        this.state = {
            uid: "",
            new_name: "",
            new_nick: "",
            open: false
        };

        this.handleUpdate = this.handleUpdate.bind();
    }

    getUrlParams() {
        let params = {};
        params["sign_out"] = false;
        params["user_update"] = false;

        let exist = false;
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; params[key + "_exist"] = true; });

        return params;
    }

    // 렌더링 후 완료
    componentDidMount = () => {

        firebase.auth().onAuthStateChanged(function (user) {
            {
                this.setState({ uid: firebase.auth().currentUser.uid });
            }
        }.bind(this)).bind(this);
    }

    printStar(star) {
        let ret = "";

        for (let i = 0; i < 5; i++) {
            if (i < star) ret += "★";
            else ret += "☆";
        }

        return ret;
    }

    deleteUser = () => {
        {
            try {
                var user = firebase.auth().currentUser;

                db.collection("users").doc(user).delete()
                    .then(() => {
                        window.location.reload(false);
                    })
                    .catch((error) => {
                        alert(error.message);
                    });

                user.delete().then(function () {

                }).catch(function (error) {
                    alert(error.message);
                });
            }
            catch (error) {
                window.location.href = './';
            }
        };
    }

    printStar(star) {
        let ret = "";

        for (let i = 0; i < 5; i++) {
            if (i < star) ret += "★";
            else ret += "☆";
        }

        return ret;

    }

    handleClickBar = () => {
        this.setState({ open: true });
    };
    
    handleCloseBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    handleUpdate = () => {
        // 빈칸 방지
        if ((this.state.new_name) || (this.state.new_nick) || (this.state.new_name == "") || (this.state.new_nick == "")) {
            this.handleClickBar();
        }

        db.collection("users").doc(firebase.auth().currentUser.uid).set(
            {
                name: this.state.new_name,
                nickname: this.state.new_nick
            }
        )
            .then(doc => {

            });

        console.log(firebase.auth().currentUser.uid);
        console.log(this.state.new_name);
        console.log(this.state.new_nick);
    }

    // 렌더링
    render() {
        let params = this.getUrlParams();
        let board = params.sign_out ? "마이페이지" : decodeURI(params.board)

        if (board == "sign_out") {
            params.sign_out = true;
        }
        else {
            params.sign_out = false;
        }

        if (board == "user_update") {
            params.user_update = true;
        }
        else {
            params.user_update = false;
        }
  
        let classes = useStyles;

        return (
            <div className="Lecture_review_main" class="main_body">

                <div className={classes.root}>
                    <Snackbar open={false} autoHideDuration={6000} onClose={this.handleCloseBar}>
                        <Alert onClose={this.handleCloseBar} severity="error">
                            빈칸 없이 입력해주세요
                    </Alert>
                    </Snackbar>
                </div>
                <div className="sidebar">
                    <aside class="sidebar">
                        <div class="p"><a href="/Mypage">내가 작성한 글</a></div>
                        <div class="p"><a>계정 정보</a></div>
                        <ul class="category">

                            <a href={"/Mypage?board=user_update"}><li>개인 정보 수정</li></a>
                            <a href={"/Mypage?board=sign_out"}><li>회원탈퇴</li></a>
                        </ul>
                    </aside>
                    {params.user_update ? (
                        <section id="submit-button">
                            <Dialog
                                open={params.user_update}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"개인 정보 수정"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        개인 정보를 수정하시겠습니까?
                                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <TextField label="이름" onChange={(e) => this.setState({ new_name: e.target.value })}></TextField>
                                    <br></br>
                                    <TextField label="닉네임" onChange={(e) => this.setState({ new_nick: e.target.value })}></TextField>
                                    <br></br>
                                    <Link to={'/Mypage'}><Button color="primary">취소</Button></Link>
                                    <Link to={'/Mypage'}><Button type="submit" onClick={this.handleUpdate} color="primary" autoFocus>확인</Button></Link>
                                </DialogActions>
                            </Dialog>
                        </section>
                    ) : (
                            <>
                            </>
                        )}
                    {params.sign_out ? (
                        <section id="submit-button">
                            <Dialog
                                open={params.sign_out}
                                onClose={this.handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"탈퇴"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        탈퇴하시겠습니까?
                                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Link to={'/Mypage'}><Button color="primary">취소</Button></Link>
                                    <Link to={'/Login'}><Button type="submit" onClick={this.deleteUser} color="primary" autoFocus>확인</Button></Link>
                                </DialogActions>
                            </Dialog>
                        </section>
                    ) : (
                            <>
                            </>
                        )}

                </div>

                <article class="article">
                    <Paper classname="paper" elevation={2}>
                        <div class="review_search">
                            <div class="mypage_category">
                                <span>내가 작성한 글</span>
                            </div>
                        </div>
                        <div>
                            <div class="review_search_small">
                                <div class="mypage_category_small">
                                    <span>강의 리뷰</span>
                                </div>
                            </div>
                            <div class="header">
                                <span>링크</span>
                                <span>내용</span>
                                <div class="btn">
                                    <button>작성날짜△</button>
                                    <button>좋아요</button>
                                </div>

                            </div>
                            <div id="reviews">
                                {db.collection("reviews")
                                    .orderBy("date", "desc")
                                    .onSnapshot((snaps) => {
                                        document.getElementById("reviews").innerHTML = "";
                                        snaps.forEach((doc) => {
                                            if (doc.data().writer_id == firebase.auth().currentUser.uid) {

                                                const reviewDiv = document.createElement("div");

                                                const htmlContent =
                                                    "<div class=\"review\">\
                                        <ul>\
                                            <li class=\"item\">\
                                                <div id='site_box'>\
                                                    <a href=\"https://www.acmicpc.net/\">백준</a>\
                                                </div>\
                                                <div class=\"info\">\
                                                    <a href='/Lecture_review_detail?baord="+ doc.data().board + "&id=" + doc.id + "'><div class=\"title\">" + doc.data().lecture_name + "</div></a>\
                                                    <div class=\"rank\">"+ this.printStar(doc.data().star) + "</div>\
                                                    <div class=\"tag\">"+ doc.data().tags + "</div>\
                                                    <Button onClick=\"location.href='/Lecture_review_main?search="+ doc.data().lecture_name + "'\" variant=\"outlined\" color=\"primary\" type=\"submit\">이 강의만 모아보기</Button>\
                                                </div>\
                                                <div class=\"like\">\
                                                    <span class=\"date\">"+ doc.data().date + "</span>\
                                                    <div class=\"likebtn\">\
                                                        <i class=\"fas fa-heart\">♥</i>\
                                                        <div class=\"likepeople\">"+ doc.data().like + "</div>\
                                                    </div>\
                                                    <span class=\"writer\">작성자 : "+ doc.data().writer_name + "</span>\
                                                </div>\
                                            </li>\
                                        </ul>\
                                    </div>";

                                                reviewDiv.innerHTML = htmlContent;

                                                document.getElementById("reviews").appendChild(reviewDiv);
                                            }
                                        })
                                    })}
                            </div>
                        </div>
                        <div>
                            <div class="review_search_small">
                                <div class="mypage_category_small">
                                    <span>코딩 캠프 리뷰</span>
                                </div>
                            </div>
                            <div class="header">
                                <span>제목</span>
                                <div class="btn">
                                    <button>작성날짜△</button>
                                    <button>조회수△</button>
                                    <button>좋아요</button>
                                </div>
                            </div>
                            <div id="postings">
                                {db.collection("postings")
                                    .orderBy("date", "desc")
                                    .onSnapshot((snaps) => {
                                        document.getElementById("postings").innerHTML = "";
                                        snaps.forEach((doc) => {

                                            if (doc.data().writer_id == firebase.auth().currentUser.uid) {

                                                const postingDiv = document.createElement("div");

                                                const htmlContent =
                                                    "<div class=\"review\">\
                                        <ul>\
                                            <li class=\"item\">\
                                                <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                                <div class=\"info\">\
                                                <a href='/Camp_review_detail?board="+ doc.data().board + "&id=" + doc.id + "'><div class=\"title\">" + doc.data().title + "</div></a>\
                                                </div>\
                                                <div class=\"like\">\
                                                    <span class=\"date\">"+ doc.data().date + "</span>\
                                                    <div class=\"likebtn\">\
                                                        <i class=\"fas fa-heart\">♥</i>\
                                                    <div class=\"likepeople\">"+ doc.data().like + "</div>\
                                                    </div>\
                                                <span class=\"writer\">작성자 : "+ doc.data().writer_name + "</span>\
                                                </div>\
                                            </li>\
                                        </ul>\
                                    </div>";
                                                postingDiv.innerHTML = htmlContent;

                                                document.getElementById("postings").appendChild(postingDiv);
                                            }
                                        })
                                    })}
                            </div>
                        </div>
                        <div>
                            <div class="review_search_small">
                                <div class="mypage_category_small">
                                    <span>솔루션</span>
                                </div>
                            </div>
                            <div class="header">
                                <span>제목</span>
                                <div class="btn">
                                    <button>작성날짜△</button>
                                    <button>조회수△</button>
                                    <button>좋아요</button>
                                </div>
                            </div>
                            <div id="solution">
                                {db.collection("solution")
                                    .orderBy("date", "desc")
                                    .onSnapshot((snaps) => {
                                        document.getElementById("solution").innerHTML = "";
                                        snaps.forEach((doc) => {

                                            if (doc.data().writer_id == firebase.auth().currentUser.uid) {

                                                const postingDiv = document.createElement("div");

                                                const htmlContent =
                                                    "<div class=\"review\">\
                                        <ul>\
                                            <li class=\"item\">\
                                                <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                                <div class=\"info\">\
                                                <a href='/Solution_detail?board="+ doc.data().board + "&id=" + doc.id + "'><div class=\"title\">" + doc.data().title + "</div></a>\
                                                </div>\
                                                <div class=\"like\">\
                                                    <span class=\"date\">"+ doc.data().date + "</span>\
                                                    <div class=\"likebtn\">\
                                                        <i class=\"fas fa-heart\">♥</i>\
                                                    <div class=\"likepeople\">"+ doc.data().like + "</div>\
                                                    </div>\
                                                <span class=\"writer\">작성자 : "+ doc.data().writer_name + "</span>\
                                                </div>\
                                            </li>\
                                        </ul>\
                                    </div>";
                                                postingDiv.innerHTML = htmlContent;

                                                document.getElementById("solution").appendChild(postingDiv);
                                            }
                                        })
                                    })}
                            </div>
                        </div>
                        <div>
                            <div class="review_search_small">
                                <div class="mypage_category_small">
                                    <span>커뮤니티</span>
                                </div>
                            </div>
                            <div class="header">
                                <span>제목</span>
                                <div class="btn">
                                    <button>작성날짜△</button>
                                    <button>조회수△</button>
                                    <button>좋아요</button>
                                </div>
                            </div>
                            <div id="community">
                                {db.collection("community")
                                    .orderBy("date", "desc")
                                    .onSnapshot((snaps) => {
                                        document.getElementById("community").innerHTML = "";
                                        snaps.forEach((doc) => {

                                            if (doc.data().writer_id == firebase.auth().currentUser.uid) {

                                                const postingDiv = document.createElement("div");

                                                const htmlContent =
                                                    "<div class=\"review\">\
                                        <ul>\
                                            <li class=\"item\">\
                                                <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                                <div class=\"info\">\
                                                <a href='/Community_view_detail?board="+ doc.data().board + "&id=" + doc.id + "'><div class=\"title\">" + doc.data().title + "</div></a>\
                                                </div>\
                                                <div class=\"like\">\
                                                    <span class=\"date\">"+ doc.data().date + "</span>\
                                                    <div class=\"likebtn\">\
                                                        <i class=\"fas fa-heart\">♥</i>\
                                                    <div class=\"likepeople\">"+ doc.data().like + "</div>\
                                                    </div>\
                                                <span class=\"writer\">작성자 : "+ doc.data().writer_name + "</span>\
                                                </div>\
                                            </li>\
                                        </ul>\
                                    </div>";
                                                postingDiv.innerHTML = htmlContent;

                                                document.getElementById("community").appendChild(postingDiv);
                                            }
                                        })
                                    })}
                            </div>
                        </div>
                    </Paper>
                </article>
            </div>
        )
    };

}

export default Mypage;
