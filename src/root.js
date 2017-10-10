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
            currentMusicItem: {}
        };
        this.playMusic=this.playMusic.bind(this);
    }
    componentDidMount() {
        $("#player").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
                }).jPlayer('play');
            },
            supplied: "mp3",
            wmode: "window",
            useStateClassSkin: true
        });
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
    }
    componentWillUnMount() {

    }
    playMusic(item) {
        $("#player").jPlayer("setMedia", {
            mp3: item.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: item
        });
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
