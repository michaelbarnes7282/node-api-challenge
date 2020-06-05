import React from 'react';
import axios from 'axios';

const Card = (props) => {
  console.log(props)


  return ( 
  <div className = 'card' >
    <h3 className = 'name' >
      {props.props.name}
    </h3>
    <p> {props.props.description}</p>

    </div>
  )
}

export default Card;