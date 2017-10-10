import React from 'react';
import ListItem from './listItem';
import './listitem.css';
let List = React.createClass({
    render() {
        let Items = this.props.musicList.map((item) => {
            return (
				<ListItem
					key={item.id}
					data={item}
				></ListItem>
            );
        });
        return (
			<ul className="mt20">
                { Items }
			</ul>
        );
    }
});

export default List;
