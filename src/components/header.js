import React, { Component } from 'react';
import logo from '../static/img/music.png'
import './header.css'
class Header extends Component {
    render(){
        return (
            <div className="abc">
                <img src={logo} alt=""/>
                <h1 className="caption">react music app</h1>
            </div>
        );
    }
}
export default Header