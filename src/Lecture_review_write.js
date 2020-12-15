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
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { SentimentSatisfied } from '@material-ui/icons';

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
const Lecture_review_write = () => {
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
    const [lecture_id, setLectureId] = useState("");
    const [lecture_name, setLectureName] = useState("");
    const [category, setCategory] = useState("");
    const [star, setStar] = useState("");
    const [tags, setTags] = useState("");
    const [level, setLevel] = useState("");
    const [period, setPeriod] = useState("");
    const [cost, setCost] = useState("");
    const [pros, setPros] = useState("");
    const [cons, setCons] = useState("");
    const [link, setLink] = useState("");
    const [date, setDate] = useState("");
    const [like, setLike] = useState("");
    const [board, setBoard] = useState(params.board);

    // 데이터 저장
    const handleSubmit = (e) => {
        e.preventDefault();
        handleClose();

        let params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
        setBoard(params.board);

        // 빈칸 방지
        if ((lecture_name == "") || (star == null) || (tags == null) || (period == null) || (cost == null) || (level == null) || (pros == null) || (cons == null) || (link == null) || (date == null)) {
            handleClickBar();
        }
        else {
            db.collection("reviews").add({
                writer_id: firebase.auth().currentUser.uid,
                lecture_id: lecture_id,
                lecture_name: lecture_name,
                star: star,
                tags: tags,
                period: period,
                cost: cost,
                level: level,
                pros: pros,
                cons: cons,
                link: link,
                date: today.toLocaleString(),
                like: 0,
                board: board
            })
                .then((docRef) => {
                    window.location.href = "/Lecture_review_detail?board="+params.board+"&id="+docRef.id;
                })
                .catch((error) => {
                    alert(error.message);
                });

            setWriterId("");
            setLectureId("");
            setLectureName("");
            setCategory("");
            setStar("");
            setTags("");
            setPeriod("");
            setCost("");
            setLevel("");
            setPros("");
            setCons("");
            setPeriod("");
            setCost("");
            setLevel("");
            setLink("");
            setDate("");
            setLike("");
            setBoard("");
        }
    };

    // 태그 관련 변수
    const {
        getRootProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        multiple: true,
        options: tagContent,
        getOptionLabel: (option) => option.title,
    });

    // 태그 기능
    const handleTag = (e) => {
        setTags(state => ({ tags: [...state.tags, e.target.value] }));
    }

    // 엔터키
    const keyHandleClickOpen = (e) => {
        if (e.key == 'Enter') {
            handleClickOpen();
        }
    }

    // 렌더링
    return (
        <div className="Lecture_review_write">
            <div className={classes.root}>
                <Snackbar open={openBar} autoHideDuration={6000} onClose={handleCloseBar}>
                    <Alert onClose={handleCloseBar} severity="error">
                        빈칸 없이 입력해주세요
                    </Alert>
                </Snackbar>
            </div>
            <div className="sidebarclass">
                <aside class="sidebar">
                    <p style={{fontWeight:"bold" , color:"#585858"}}>언어</p>
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
                <div class="category_name">
                    <span style={{fontSize:"16px"}}>{params.board}</span>
                </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <section id="lecture-name" class="writing-block">
                            <div class="item">
                                <div class="review-entry">
                                    <span>강좌 이름 :</span>
                                </div>
                                <div class="review-content">
                                    <input type="text" id="name" class="short-text" list="lecture-list" value={lecture_name} onChange={(e) => setLectureName(e.target.value)}></input>
                                    <datalist id="lecture-list">
                                        <option value="유튜브 클론코딩"></option>
                                        <option value="Amazing, awesome, incredible!"></option>
                                    </datalist>
                                </div>
                            </div>
                        </section>

                        <section id="contants" class="writing-block">
                            <div id="star" class="item">
                                <div class="review-entry">
                                    <span class="entry-name">별점</span>
                                </div>
                                <div class="review-content">
                                    <Select id="star-score" value={star} onChange={(e) => setStar(e.target.value)}>
                                        <option value="5">★★★★★</option>
                                        <option value="4">★★★★☆</option>
                                        <option value="3">★★★☆☆</option>
                                        <option value="2">★★☆☆☆</option>
                                        <option value="1">★☆☆☆☆</option>
                                    </Select>
                                </div>
                            </div>

                            <div id="hashtags" class="item">
                                <div class="review-entry">
                                    <span class="entry-name">태그</span>
                                </div>
                                <div class="review-content">
                                    <ul class="tags">
                                        <NoSsr>
                                            <div>
                                                <div {...getRootProps()}>
                                                    <InputWrapper id="tagstyle" ref={setAnchorEl} className={focused ? 'focused' : ''} value={tags} onChange={(e) => setTags(e.target.value)}>
                                                        {value.map((option, index) => (
                                                            <Tag label={option.title} {...getTagProps({ index })} value={tags} onChange={handleTag} />
                                                        ))}

                                                        <input {...getInputProps()} />
                                                    </InputWrapper>
                                                </div>
                                                {groupedOptions.length > 0 ? (
                                                    <Listbox {...getListboxProps()}>
                                                        {groupedOptions.map((option, index) => (
                                                            <li {...getOptionProps({ option, index })}>
                                                                <span>{option.title}</span>
                                                                <CheckIcon fontSize="small" />
                                                            </li>
                                                        ))}
                                                    </Listbox>
                                                ) : null}
                                            </div>
                                        </NoSsr>
                                    </ul>
                                </div>
                            </div>

                            <div id="lecture-info" class="item">
                                <div class="review-entry">
                                    <span class="entry-name">수강 정보</span>
                                </div>
                                <div class="review-content">
                                    <span>수강 기간 : </span>
                                    <input type="text" id="period" value={period} onChange={(e) => setPeriod(e.target.value)}></input>
                                    <span> / 수강 비용 : </span>
                                    <input type="text" id="cost" value={cost} onChange={(e) => setCost(e.target.value)}></input>
                                </div>
                            </div>

                            <div id="pros" class="item">
                                <div class="review-entry">
                                    <span class="entry-name">장점</span>
                                </div>
                                <div class="review-content">
                                    <input type="text" id="pros" class="long-text" value={pros} onChange={(e) => setPros(e.target.value)}></input>
                                </div>
                            </div>

                            <div id="cons" class="item">
                                <div class="review-entry">
                                    <span class="entry-name">단점</span>
                                </div>
                                <div class="review-content">
                                    <input type="text" id="cons" class="long-text" value={cons} onChange={(e) => setCons(e.target.value)} />
                                </div>
                            </div>

                            <div id="link" class="item">
                                <div class="review-entry">
                                    <span class="entry-name">강의 링크</span>
                                </div>
                                <div class="review-content">
                                    <input type="text" id="link" class="short-text" value={link} onChange={(e) => setLink(e.target.value)}></input>
                                </div>
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
                                    <Button type="submit" onClick={handleSubmit} color="primary" autoFocus>확인</Button>
                                </DialogActions>ㅊㅇ
                            </Dialog>
                        </section>
                    </form>
                </Paper>
            </article>
        </div>
    );
}


// 태그 종류
const tagContent = [
    { title: '#쉬워요 ' },
    { title: '#적당해요 ' },
    { title: '#어려워요 ' },
    { title: '#효과적이에요 ' },
    { title: '#전체구조를보여줘요 ' },
    { title: '#실무적이에요' }
];

export default Lecture_review_write;
