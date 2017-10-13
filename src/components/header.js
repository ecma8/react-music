import React, { Component } from 'react';
import logo from '../static/img/music.png'
import './header.css'
class Header extends Component {
    render(){
        return (
            <div className="row components-logo">
                <img src={logo} width="40" alt="" className="-col-auto"/>
                <h1 className="caption">Music Player Build By React</h1>
            </div>
        );
    }
}
export default Header