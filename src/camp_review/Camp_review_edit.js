import React, { useState } from 'react';
import '../total.css';
import { Snackbar, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { db } from '../api/firebase.js';
import firebase from '../api/firebase';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

// 오늘 날짜
const today = new Date();

// 게시글 작성
const Camp_review_edit = () => {
    // 알림창
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // 빈칸 방지
    const classes = useStyles();
    const [openBar, setOpenBar] = React.useState(false);

    const handleClickBar = () => {
        setOpenBar(true);
    };

    const handleCloseBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenBar(false);
    };

    let params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });

    // 데이터 변수
    const [writer_id, setWriterId] = useState("");
    const [board, setBoard] = useState(params.board);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 데이터 저장
    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();

        // 빈칸 방지
        if ((title == "" || content == "")){
            handleClickBar();
        }
        else {
            db.collection("users").doc(firebase.auth().currentUser.uid).get()
               .then(doc => {

            db.collection("postings").doc(params.id).set({
                writer_id: firebase.auth().currentUser.uid,
                writer_name: doc.data().nickname,
                board : board,
                title: title,
                content: content,
                date: today.toLocaleString(),
                like: 0,
                visit: 0,
            })
                .then((docRef) => {
                    window.location.href = "/Camp_review_detail?board="+params.board+"&id="+params.id;
                })
                .catch((error) => {
                    alert(error.message);
                });
            });


            setWriterId("");
            setBoard("");
            setTitle("");
            setContent("");
        }
    };

    // 엔터키
    const keyHandleClickOpen = (e) => {
        if (e.key == 'Enter') {
            handleClickOpen();
        }
    }

    // 렌더링
    return (
        <div className="Camp_review_write" class="main_body                                                             45rE  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;  font-weight: bold;
    font-size:0.9vw;
    margin:3px auto;">
            <div className={classes.root}>
                <Snackbar open={openBar} autoHideDuration={6000} onClose={handleCloseBar}>
                    <Alert onClose={handleCloseBar} severity="error">
                        빈칸 없이 입력해주세요
                    </Alert>
                </Snackbar>
            </div>
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
                <div class="category_name category_name_write_page">
                    <span style={{fontSize:"16px"}}>{decodeURI(params.board)}</span>
                </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <section id="lecture-name" class="writing-block">
                            <div class="item">
                                <div class="review-entry">
                                    <span> 캠프 제목 : </span>
                                </div>


                                <div class="review-content">
                                    <input class="short-text" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                                </div>
                              </div>
                          </section>

                                <section id = "constants" class="writing-block">
                                    <textarea id="input" type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
                                </section>




                        <section id="submit-button">
                            <Button variant="contained" onClick={handleClickOpen} onKeyPress={keyHandleClickOpen}>글 수정</Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"리뷰 수정"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        리뷰를 수정하시겠습니까?
                                        </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">취소</Button>
                                    <Link to='/Camp_review_detail'><Button type="submit" onClick={handleSubmit} color="primary" autoFocus>확인</Button></Link>
                                </DialogActions>
                            </Dialog>
                        </section>
                    </form>
                </Paper>
            </article>
        </div>
    );

}

export default Camp_review_edit;
