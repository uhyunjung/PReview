import React, { useState } from 'react';
import './total.css';
import { Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { db } from './firebase.js';

// Paper 태그 스타일
const styles = ({ spacing: { unit } }) => ({
    paper: {
        margin: `${unit * 3}px auto`,
        padding: unit * 2,
        maxWidth: 400
    }
})

const today = new Date();
// 게시글 작성
const Lecture_review_write = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();

        db.collection("reviews").add({
            writer_id: writer_id,
            lecture_id: lecture_id,
            lecture_name: lecture_name,
            category: category,
            star: star,
            tags: tags,
            period: period,
            cost: cost,
            level: level,
            pros: pros,
            cons: cons,
            link: link,
            date: today.toLocaleString(),
            like: like
        })
            .then(() => {
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
    }

    // 렌더링
    return (
        <div className="Lecture_review_write">
            <div className="sidebarclass">
                <aside class="sidebar">
                    <p>언어</p>
                    <ul class="category">
                        <li><a href="#">C / C++</a></li>
                        <li><a href="#">C#</a></li>
                        <li><a href="#">Java</a></li>
                        <li><a href="#">Python</a></li>
                        <li><a href="#">Javascript</a></li>
                    </ul>
                    <br></br>
                    <p>분야</p>
                    <ul class="category">
                        <li><a href="#">Algorithm</a></li>
                        <li><a href="#">HTML/CSS/Javascript</a></li>
                        <li><a href="#">Server</a></li>
                        <li><a href="#">Full Stack</a></li>
                        <li><a href="#">ML/DL</a></li>
                    </ul>
                </aside>
            </div>

            <article id="article">
                <Paper classname="paper" elevation={3}>
                    <header>Full Stack</header>
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
                                    <select id="star-score" value={star} onChange={(e) => setStar(e.target.value)}>
                                        <option value="5">★★★★★</option>
                                        <option value="4">★★★★☆</option>
                                        <option value="3">★★★☆☆</option>
                                        <option value="2">★★☆☆☆</option>
                                        <option value="1">★☆☆☆☆</option>
                                    </select>
                                </div>
                            </div>

                            <div id="hashtags" class="item">
                                <div class="review-entry">
                                    <span class="entry-name">태그</span>
                                </div>
                                <div class="review-content">
                                    <ul class="tags">
                                        <li><button>#쉬워요</button></li>
                                        <li><button>#적당해요</button></li>
                                        <li><button>#어려워요</button></li>
                                        <li><button id="add-tag">+</button></li>
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
                            <Button variant="contained" type="submit" onClick={handleClickOpen}>글 작성</Button>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"리뷰 작성 완료"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        리뷰가 저장되었습니다
                                        </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        확인
                                            </Button>
                                </DialogActions>
                            </Dialog>
                        </section>
                    </form>
                </Paper>
            </article>
        </div>
    );

}

export default Lecture_review_write;
