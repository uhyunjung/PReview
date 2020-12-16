import React, { useState } from 'react';
import './total.css';
import { Snackbar, NoSsr, Select, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import MuiAlert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import { db } from './firebase.js';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Paper 태그 스타일
const styles = ({ spacing: { unit } }) => ({
    paper: {
        margin: `${unit * 3}px auto`,
        padding: unit * 2,
        maxWidth: 400
    }
})
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const InputWrapper = styled('div')`
&:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 30px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
    <div {...props}>
        <span>{label}</span>
        <CloseIcon id='x' onClick={onDelete} />
    </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: #fafafa;
  border: 1px solid #e8e8e8;
  border-radius: 2px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;

  #x {
      font-size:25px;
  }

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 12px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

// 오늘 날짜
const today = new Date();

// 게시글 작성
const Community_view_write = () => {
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
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) { params[key] = value; });

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
        if ((title == "" || content == "")) {
            handleClickBar();
        }
        else {
            db.collection("users").doc(firebase.auth().currentUser.uid).get()
                .then(doc => {

                    db.collection("community").add({
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
                            window.location.href = "/Community_view_detail?board=" + params.board + "&id=" + docRef.id;
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
        if (e.key == 'Enter') {
            handleClickOpen();
        }
    }

    // 렌더링
    return (
        <div className="Camp_review_write">
            <div className={classes.root}>
                <Snackbar open={openBar} autoHideDuration={6000} onClose={handleCloseBar}>
                    <Alert onClose={handleCloseBar} severity="error">
                        빈칸 없이 입력해주세요
                    </Alert>
                </Snackbar>
            </div>
            <div className="sidebarclass">
                <aside class="sidebar" >
                    <ul class="category_camp">
                        <li><a href="/Community_view_main?board=자유게시판">자유게시판</a></li>
                        <li><a href="/Community_view_main?board=질문게시판">질문게시판</a></li>
                        <li><a href="/Community_view_main?board=강의 수강원 모집">강의 수강원 모집</a></li>
                        <li><a href="/Community_view_main?board=프로젝트 참가자 모집">프로젝트 참가자 모집</a></li>
                    </ul>
                </aside>
            </div>
            <article class="article">
                <Paper classname="paper" elevation={3}>
                    <div class="category_name">
                        <span style={{ fontSize: "16px" }}>{decodeURI(params.board)}</span>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <section id="lecture-name" class="writing-block">
                            <div id='review'>
                                <div id="review_header">
                                    <span id="title">제목 : </span>
                                    <input id="title_input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <hr id="line" />
                                <div id="write_box">
                                    <input id="input" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                                </div>
                                <hr id="line" />
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
                                    <Link to='/Community_detail'><Button type="submit" onClick={handleSubmit} color="primary" autoFocus>확인</Button></Link>
                                </DialogActions>
                            </Dialog>
                        </section>
                    </form>
                </Paper>
            </article>
        </div>
    );

}

export default Community_view_write;
