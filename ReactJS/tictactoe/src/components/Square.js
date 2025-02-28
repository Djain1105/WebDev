import React from 'react'

// these classes are to be made in app.css in src folder...I was not having the code for it :)
export default function Square(props) {      // function based component
    return (
        <button className='square'>
            {props.insideValue}
        </button>
    )
    // the square will get the value
}