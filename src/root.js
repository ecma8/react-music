import React, { Component } from 'react';
import Player from './page/player';
import Header from './components/header';
import List from './page/list';
import $ from 'jquery';

import 'jplayer';
import './static/common.css';
import PubSub from 'pubsub-js'
import music_list from './components/music_list';
class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            progress: '10%',
            barColor:'#00f',
            musicList: music_list,
            currentMusicItem: {},
            count:0,
            repeatType: 'cycle'
        };
        this.playMusic=this.playMusic.bind(this);
        this.playNext=this.playNext.bind(this);
    }
    componentDidMount() {
        $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });
        this.playMusic(music_list[0]);
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
        PubSub.subscribe('CHANAGE_REPEAT', () => {
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({
                repeatType: repeatList[index]
            });
        });
    }
    counterHandler() {
        this.setState({
            count: this.state.count + 1
        });
    }
    componentWillUnMount() {
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DEL_MUSIC');
        PubSub.unsubscribe('CHANAGE_REPEAT');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('PLAY_PREV');
    }
    playMusic(item) {
        $("#player").jPlayer("setMedia", {
            mp3: item.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: item
        });
    }
    playNext(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusitItem);
        if (type === 'next') {
            index = (index + 1) % this.state.musicList.length;
        } else {
            index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
        }
        let musicItem = this.state.musicList[index];
        this.setState({
            currentMusitItem: musicItem
        });
        this.playMusic(musicItem);
    }
    findMusicIndex(music) {
        let index = this.state.musicList.indexOf(music);
        return Math.max(0, index);
    }
    render() {
        return (
            <div>
                <Header>
                </Header>
                <Player currentMusicItem={this.state.currentMusicItem}>
                </Player>
                <div id="player">
                </div>
                <List musicList={this.state.musicList}></List>
            </div>
        );
    }
}
export default App;
