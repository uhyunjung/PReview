import React, { useState } from 'react';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db, auth } from './firebase';

// Paper 태그 스타일
const styles = ({ spacing: { unit } }) => ({
    paper: {
        margin: `${unit * 3}px auto`,
        padding: unit * 2,
        maxWidth: 400
    }
})

const Camp_review_detail = () => {
    // 렌더링
    return (
        <div className="Lecture_review_detail">
            <div className="sidebar">
                <aside class="sidebar">
                    <p>언어</p>
                    <ul class="category">
                        <li><a href="#">C / C++</a></li>
                        <li><a href="#">C#</a></li>
                        <li><a href="#">Java</a></li>
                        <li><a href="#">Python</a></li>
                        <li><a href="#">Javascript</a></li>
                    </ul>
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
            <article>
                <Paper classname="paper" elevation={3}>
                    <div class="lecturename">
                        <div class="category_name">Full Stack</div>
                        <span>[풀스택] 유튜브 클론코딩(유튜브 백엔드 + 프론트엔드 + 배포)</span>
                        <div class="writer_info">
                            <span class="writer">김작성</span><br></br>
                            <span class="date">2020.01.27</span>
                        </div>
                    </div>
                    <div class="reviewdetail">
                        <div class="star">
                            <span>별점</span>
                            <span>★★★★☆</span>
                        </div>
                        <div class="tags">
                            <span>태그</span>
                            <span>#쉬워요 #효과적이에요 #전체_구조를_보여줘요 #실무적이에요</span>
                        </div>
                        <div class="lecture_info">
                            <span>수강 정보</span>
                            <span class="period">수강 기간: 6개월</span>
                            <span class="cost">수강 비용 : 월 60,000원</span>
                        </div>
                        <div class="pros">
                            <span>장점</span>
                            <span>단계별로 차근차근 알려주셔서 따라가기 쉬웠고 꼭 들어보세요. 너무 좋아요.</span>
                        </div>
                        <div class="cons">
                            <span>단점</span>
                            <span>저는 가격이 약간 부담이었어요. 근데 커뮤니티에서 같이 수강할 사람 구하시면 부담 없이 들을 수 있지 않을까요.</span>
                        </div>
                        <button class="go">강의 바로가기</button>
                    </div>
                    <div class="comment">
                        <div class="comment_header">
                            <span>댓글</span>
                            <div>
                                <i class="fas fa-heart"></i>
                                <span>54</span>
                            </div>
                        </div>
                        <div>
                            <form class="comment_write">
                                <input class="keyword" type="text" name="search" size="100"></input>
                                <button>작성</button>
                            </form>
                        </div>
                        <div class="comment_show">
                            <span class="comment_id">닉네임1</span>
                            <span class="comment_content">와 정말 유익한 후기!</span>
                            <span class="comment_date">2020/11/7 17:35:55</span>
                        </div>
                    </div>
                </Paper>
            </article>
        </div>
    );
}

export default Camp_review_detail;
