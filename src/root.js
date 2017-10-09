import React, { Component } from 'react';
import Player from './page/player';
import Header from './components/header';
import $ from 'jquery';
import 'jplayer';
import music_list from './components/music_list';
console.log(music_list);

class Root extends Component{
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            barColor:'#00f',
            currentMusicItem:1
        }
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
    }
    componentWillUnMount() {

    }
    render() {
        return (
            <div>
                <Header>
                </Header>
                <Player>
                </Player>
                <div id="player">
                </div>
            </div>
        );
    }
}

export default Root;
