import React,{Component} from 'react';
import PubSub from 'pubsub-js';
import '../static/css/listitem.css';

class ListItem extends Component{
    deleteHandler=(item, event)=>{
        event.stopPropagation();
        PubSub.publish('DEL_MUSIC', item);
    };
    playMusic=(item, e)=>{
        PubSub.publish('PLAY_MUSIC', item);
    };
    render() {
        let item = this.props.data;
        return (
            <li className={`row components-listitem${this.props.focus ? ' focus' : ''}`} onClick={this.playMusic.bind(this, item)}>
                <p><span className="bold">{item.title}</span>  -  {item.artist}</p>
                <p className="-col-auto delete" onClick={this.deleteHandler.bind(this, item)}></p>
            </li>
        );
    }
}
export default ListItem;
