import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import { Select, Paper, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { db } from './firebase.js';
import './total.css';

class Mypage extends Component {
    Constructor() {
        this.myRef = React.createRef();

        this.state = {
            open : false,
            uid: ""
        };
    }


    // 렌더링 후 완료
    componentDidMount = () => {

            firebase.auth().onAuthStateChanged(function (user) {
                {
                    this.setState({ uid: firebase.auth().currentUser.uid });
                }
            }.bind(this)).bind(this);

        
            db.collection("reviews")
            .orderBy("date","desc")
            .onSnapshot(snaps => {
                snaps.forEach(doc => {
                        const reviewDiv = document.createElement("div");
                        let htmlContent;

                        if(this.state.uid==doc.data().writer_id)
                        {
                            htmlContent =
                            "<div class=\"review\">\
                                <ul>\
                                    <li class=\"item\">\
                                        <a href=\"#\"><img src=\"image.jpg\" alt=\"\" width=\"100\"></img></a>\
                                        <div class=\"info\">\
                                        <a href='/Lecture_review_detail?board="+doc.data().board+"&id="+doc.id+"'><div class=\"title\">"+ doc.data().lecture_name + "</div></a>\
                                            <div class=\"rank\">"+ this.printStar(doc.data().star) + "</div>\
                                            <div class=\"tag\">"+ doc.data().tags + "</div>\
                                            <Button onClick=\"location.href='/Lecture_review_main?search="+doc.data().lecture_name+"'\" variant=\"outlined\" color=\"primary\" type=\"submit\">이 강의만 모아보기</Button>\
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
                        if(this.myRef!=null)
                        {
                            this.myRef.appendChild(reviewDiv);
                        }
                        }
                 
            })
        })
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
            var user = firebase.auth().currentUser;

            user.delete().then(function() {
                // User deleted.
              }).catch(function(error) {
                alert(error.message);
              });
            
            
            db.collection("users").doc(user).delete()
                .then(() => {
                })
                .catch((error) => {
                    alert(error.message);
                });
        };
    }

    
    handleClickOpen = () => {
        this.setState({open : true});
    }

    handleClose = () => {
        this.setState({open : false});
    }

    // 렌더링
    render() {
        
        return (
            <div className="Lecture_review_main">
                <div className="sidebar">
                    <aside class="sidebar">
                        <p><a href="/Mypage">내가 작성한 글</a></p>
                        
                        <p>내 계정 정보</p>
                        <ul class="category">
                            <li><a href="/Lecture_review_main?board=Algorithm">개인 정보 수정</a></li>
                            <li onClick={this.handleClickOpen}>회원탈퇴</li>
                                        <>
                                            <section id="submit-button">
                                                <Dialog
                                                    open={false}
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
                                                        <Button onClick={this.handleClose} color="primary">취소</Button>
                                                        <Link to={'/Main'}><Button type="submit" onClick={this.deleteUser} color="primary" autoFocus>확인</Button></Link>
                                                    </DialogActions>
                                                </Dialog>
                                        </section>
                                        </>
                        </ul>
                    </aside>
                </div>
                <article class="article">
                    <Paper classname="paper" elevation={2}>
                        <div class="review_search">
                            <div class="category_name">
                            
                            </div>
                            <div>
                                <form class="search">
                                    <button>
                                        <i class="fas fa-search"></i>
                                    </button>
                                    <input class="keyword" type="text" name="search" size="80"></input>
                                </form>
                            </div>
                            
                        </div>
                        
                        <div class="header">
                            <span>링크</span>
                            <span>내용</span>
                            <div class="btn">
                                <button value="date" onClick={(e)=>this.order(e.target.value)}>작성날짜△</button>
                                <button value="like" onClick={(e)=>this.order(e.target.value)}>좋아요</button>
                            </div>

                        </div>
                        <div id="reviews" ref={(DOMNodeRef) => {
                            this.myRef=DOMNodeRef;
                        }}>
                        </div>
                    </Paper>
                </article>
            </div>
        )
    };

}

export default Mypage;
