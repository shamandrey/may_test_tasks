/**
 * Created by N56 on 14.04.2018.
 */
import React, { Component } from 'react';
import Item from './Item';


export class Sibar extends Component {
  render() {
    var onSelectClick = this.props.onSelectClick;
    var selected = this.props.selected;


    return (
      <div>
        {
          this.props.places.map(
            (item) => (
              <Item onclick={onSelectClick} select={selected}  name={item}/>
            )
          )
        }
      </div>
    );
  }
}
