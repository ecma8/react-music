import React, { Component } from 'react';
import '../static/css/progress.css';
class Progress extends Component{
    constructor(aaa) {
        super(aaa);
    }
    static defaultProps = {
        barColor: '#ff24ea'
    };
    changeProgress= (e) =>{
        let progressBar=this.refs.progressBar;
        let progress=(e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        this.props.onProgressChange(progress)
    };
    render(){
        return (
            <div>
                <div className="progress-box" ref="progressBar"  onClick={this.changeProgress}>
                    <div className="progress" style={{width:`${this.props.progress}%`,background:this.props.barColor}}></div>
                </div>
            </div>

        );
    }
}
export default Progress;