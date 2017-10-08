import React, { Component } from 'react';
import Progress from './components/progress'
import Header from './components/header'
import $ from 'jquery'
import 'jplayer'
let duration=null;
class Root extends Component{
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            barColor:'#00f'
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
        $("#player").on($.jPlayer.event.timeupdate, (e) => {
            duration=e.jPlayer.status.duration;
            this.setState({
                progress:e.jPlayer.status.currentPercentAbsolute
            });
        });
    }
    componentWillUnMount() {
        $("#player").off($.jPlayer.event.timeupdate);
    }
    counterHandler() {
        this.setState({
            count: this.state.count + 1
        });
    }
    progressChangeHandler(progress){
        $("#player").jPlayer('play',duration*progress)
    }
    render() {
        return (
            <div>
                <Header/>
                <Progress
                    progress={this.state.progress}
                    onProgressChange={
                        this.progressChangeHandler
                    }
                >
                </Progress>
                <div id="player">

                </div>
            </div>
        );
    }
}

export default Root;
