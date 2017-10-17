import React, { Component } from 'react';
import {Link} from 'react-router';
import Progress from './progress'
import '../static/css/player.css';
import PubSub from 'pubsub-js';
class Player extends Component{
	constructor(props){
		super(props);
        this.state ={
            progress: 0,
            volume: 30,
            isPlay: true,
            leftTime: '0:00',

        };
    }
	componentDidMount(){
        let audio =document.getElementById(`audio`);
		audio.addEventListener('timeupdate',()=> {
            let bl = audio.currentTime / audio.duration;
            if (bl === 1) {
                PubSub.publish('END');
            }
            this.setState({
                progress: bl * 100,
                leftTime: this.formatTime(audio.duration * (1 - bl))
            });
        })
    }
	componentWillUnmount(){
        let audio =document.getElementById(`audio`);
        audio.removeEventListener('timeupdate',()=>null,false)
	}
	formatTime = (time) =>{
		time = Math.floor(time);
		let miniute =time? Math.floor(time / 60):0;
		let seconds =time? Math.floor(time % 60):0;
		return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
	};
	changeProgressHandler = (progress) =>{
        let audio =document.getElementById(`audio`);
        audio.currentTime=audio.duration*progress;
		this.setState({
			isPlay: true,
			progress:progress*100
		});
	};
	changeVolumeHandler = (progress) =>{
        let audio =document.getElementById(`audio`);
        audio.volume=progress;
        this.setState({
            volume: progress*100
        });
	};
	play = () => {
        let audio =document.getElementById(`audio`);
		if (this.state.isPlay) {
            audio.pause();
		} else {
            audio.play();
        }
		this.setState({
			isPlay: !this.state.isPlay
		});
	};
	next = () =>{
		PubSub.publish('PLAY_NEXT');
	};
    prev = () =>{
		PubSub.publish('PLAY_PREV');
	};
	changeRepeat = () =>{
		PubSub.publish('CHANGE_REPEAT');
	};
    render() {
        return (
            <div className="player-page">
				<h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-{this.state.leftTime}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
					                <Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler}
					                >
					                </Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px'}}>
			                <Progress
								progress={this.state.progress}
								onProgressChange={this.changeProgressHandler}
			                >
			                </Progress>
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={this.prev}></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
	                			<i className="icon next ml20" onClick={this.next}></i>
                			</div>
                			<div className="-col-auto">
                				<i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">
                		<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                	</div>
                </div>
            </div>
        );
    }
}
export default Player;
