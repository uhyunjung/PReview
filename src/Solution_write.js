import React, { useState } from 'react';
import './total.css';
import { Snackbar, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { db } from './firebase.js';
import firebase from 'firebase';
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
const Solution_write = () => {
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
   const [writer_name, setWriterName] = useState("");
   const [board, setBoard] = useState(params.board);
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");

   // 데이터 저장
   const handleSubmit = (e) => {
       e.preventDefault();
       handleClose();

       // 빈칸 방지
       if ((title === "" || content === "")) {
           handleClickBar();
       }
       else {
           db.collection("users").doc(firebase.auth().currentUser.uid).get()
               .then(doc => {

                   db.collection("solution").add({
                       writer_id: firebase.auth().currentUser.uid,
                       writer_name: doc.data().nickname,
                       board: board,
                       title: title,
                       content: content,
                       date: today.toLocaleString(),
                       like: 0,
                       visit: 0,
                   })
                       .then((docRef) => {
                           window.location.href = "/Solution_detail?board=" + params.board + "&id=" + docRef.id;
                       })
                       .catch((error) => {
                           alert(error.message);
                       });
               });

           setWriterId("");
           setBoard("");
           setTitle("");
           setContent("");
           setWriterName("");
       }
   };

    // 엔터키
    const keyHandleClickOpen = (e) => {
        if (e.key === 'Enter') {
            handleClickOpen();
        }
    }

    // 렌더링
    return (
        <div className="Camp_review_write" class="main_body">
            <div className={classes.root}>
                <Snackbar open={openBar} autoHideDuration={6000} onClose={handleCloseBar}>
                    <Alert onClose={handleCloseBar} severity="error">
                        빈칸 없이 입력해주세요
                    </Alert>
                </Snackbar>
            </div>
            <div class='main_left'>
                <ul class="category_camp">
                    <li><a href="/Solution_main?board=알고리즘">솔루션</a></li>
                </ul>
            </div>
            <article class="article">
                <Paper classname="paper" elevation={3}>
                    <div class="category_name category_name_write_page">
                        <span>{decodeURI(params.board)}</span>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <section id="lecture-name" class="writing-block">
                            <div class="item">
                                <div class="review-entry">
                                    <span>제목 :</span>
                                </div>
                                <div class="review-content">
                                    <input id="title_input" class="short-text" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                            </div>
                        </section>
                        <section id="contants" class="writing-block">
                            <div id="write_box" class="review-content">
                                <input id="input" type="text" class="long-text" value={content} onChange={(e) => setContent(e.target.value)} />
                            </div>
                        </section>

                        <section id="submit-button">
                            <Button variant="contained" onClick={handleClickOpen} onKeyPress={keyHandleClickOpen}>글 작성</Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"리뷰 작성"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        리뷰를 저장하시겠습니까?
                                        </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">취소</Button>
                                    <Link to='/Solution_detail'><Button type="submit" onClick={handleSubmit} color="primary" autoFocus>확인</Button></Link>
                                </DialogActions>
                            </Dialog>
                        </section>
                    </form>
                </Paper>
            </article>
        </div>
    );

}

export default Solution_write;
