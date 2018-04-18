import React from 'react';

function placeName(place) {
  // extract text from link
  return place.name.userName.replace(/<(?:.|\n)*?>/g, '');
}

export default class Item extends React.Component {
  render() {
    var name = placeName(this.props);
    var icon = this.props.name.avatar;
    var selClass = (name === this.props.selected) ? 'selected' : '';
    var onSelectClick = this.props.onclick;
    return (
      <div className="item-sibebar">
        <img src={icon} alt=""/>
        <span className={selClass} onClick={onSelectClick} key={name}>{name}</span>
      </div>

    );
  }
}

