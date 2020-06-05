import React from 'react'

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