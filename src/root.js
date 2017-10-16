import React, { Component } from 'react';
import Player from './components/player';
import Header from './components/header';
import List from './components/list';
import randomRange from './utils/util';
import Audio from './components/Audio';
import { Router, IndexRoute, Route, hashHistory} from 'react-router';
import './static/common.css';
import PubSub from 'pubsub-js'
import music_list from './components/music_list';
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            musicList: music_list,
            currentMusicItem: {},
            count:0,
            repeatType: 'cycle',
        };
    }
    componentDidMount() {
        // $("#player").jPlayer({
        //     supplied: "mp3",
        //     wmode: "window",
        //     useStateClassSkin: true
        // });
        this.playMusic(music_list[0]);
        // $("#player").bind($.jPlayer.event.ended, (e) => {
        //     this.playWhenEnd();
        // });
        PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
            this.playMusic(item);
        });
        PubSub.subscribe('DEL_MUSIC', (msg, item) => {
            this.setState({
                musicList: this.state.musicList.filter((music) => {
                    return music !== item;
                })
            });
        });
        PubSub.subscribe('END', (msg, item) => {
            this.playWhenEnd();
        });
        PubSub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });
        PubSub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });
        let repeatList = [
            'cycle',
            'once',
            'random'
        ];
        PubSub.subscribe('CHANGE_REPEAT', () => {
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            });
        });
    }
    counterHandler=()=>{
        this.setState({
            count: this.state.count + 1
        });
    };
    playWhenEnd=()=>{
        if (this.state.repeatType === 'random') {
            let index = this.findMusicIndex(this.state.currentMusitItem);
            let randomIndex = randomRange(0, this.state.musicList.length - 1);
            while(randomIndex === index) {
                randomIndex = randomRange(0, this.state.musicList.length - 1);
            }
            this.playMusic(this.state.musicList[randomIndex]);
        } else if (this.state.repeatType === 'once') {
            this.playMusic(this.state.currentMusitItem);
        } else {
            this.playNext();
        }
    };
    componentWillUnMount=()=>{
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DEL_MUSIC');
        PubSub.unsubscribe('CHANGE_REPEAT');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('PLAY_PREV');
        PubSub.unsubscribe('END');
    };
    playMusic=(item)=>{
        let audio =document.getElementById(`audio`);
        audio.src = item.file;
        audio.load();
        audio.play();
        this.setState({
            currentMusicItem: item
        });
    };
    playNext=(type = 'next')=>{
        let index = this.findMusicIndex(this.state.currentMusicItem);
        if (type === 'next') {
            index = (index + 1) % this.state.musicList.length;
        } else {
            index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
        }
        let musicItem = this.state.musicList[index];
        this.setState({
            currentMusicItem: musicItem
        });
        this.playMusic(musicItem);
    };
    findMusicIndex(music) {
        let index = this.state.musicList.indexOf(music);
        return Math.max(0, index);
    }
    render() {
        return (
            <div className="container">
                <Header/>
                <Audio/>
                {React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }
}
class Root extends Component{
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Player}/>
                    <Route path="/list" component={List} />
                </Route>
            </Router>
        );
    }
}
export default Root;