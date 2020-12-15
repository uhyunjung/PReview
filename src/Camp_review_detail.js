import React, { Component } from 'react';
import { Paper, Button } from '@material-ui/core';
import './total.css';
import { db, auth } from './firebase';

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

        this.state = {
            items: []
        };
    }

    likeUpdate() {
        let params = this.getUrlParams();
        let edit = this.state.items.like;
        console.log(edit);

        db.collection("postings").doc(params.id).update({
            'like': edit+1
        }).then(() => {
            window.location.reload(false);
        })
    }

    getUrlParams() {
        var params = {};
        window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
        return params;
    }

    componentWillMount() {
        let params = this.getUrlParams();
        let review = db.collection("postings").doc(params.id);

        review.get().then(res => {
            this.setState({items: res.data()});
        });
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
                            <li><a href="/Camp_review_main?board=알고리즘">알고리즘</a></li>
                            <li><a href="/Camp_review_main?board=웹프로그래밍">웹프로그래밍</a></li>
                            <li><a href="/Camp_review_main?board=데이터 분석">데이터분석</a></li>
                            <li><a href="/Camp_review_main?board=AI">AI</a></li>
                        </ul>
                    </aside>
                </div>
                <article>
                    <Paper classname="paper" elevation={3}>
                        <div id="review_header">
                            <div id="review_title">{item.title}</div>
                            <div id="writer_info">
                                <span id="writer">{item.writer_id}</span>
                                <span id="date">{item.date}</span>
                            </div>
                        </div>
                        <hr id="line" />
                        <div id="review_content">
                            {item.content}
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
                                        <input id="input" type="text" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value, posting_id: item.writer_id })}></input>
                                        <Button variant="contained" type="submit" onClick={this.handleSubmitComment}>댓글 작성</Button>
                                    </form>
                                </div>
                                <div class="item">
                                    <div class="comment_nickname">닉네임 1</div>
                                    <div class="comment_content">와 정말 유익한 후기!</div>
                                    <div class="comment_date">2020/11/7</div>
                                    <div class="comment_time">17:35:55</div>
                                </div>

                                <div class="item">
                                    <div class="comment_nickname">닉네임 2</div>
                                    <div class="comment_content">저도 들어봐야겠어요!</div>
                                    <div class="comment_date">2020/11/7</div>
                                    <div class="comment_time">17:50:43</div>
                                </div>
                            </div>
                    </Paper>
                </article>
            </div>
        );
    }
}

export default Camp_review_detail;
