import React,{Component} from 'react';
import ListItem from './listItem';
import './listitem.css';
class List extends Component{
    render() {
        let Items = this.props.musicList.map((item) => {
            return (
                <ListItem
                    key={item.id}
                    data={item}
                    focus={this.props.currentMusicItem === item}
                ></ListItem>
            );
        });
        return (
            <ul>
                { Items }
            </ul>
        );
    }
}

export default List;
