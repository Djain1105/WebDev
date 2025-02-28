import React from "react";
import Square from "./Square";

export default function Board(props) {       // Function based component
    return (                                // each row has 3 square components and there will be 3 such rows
        <div>
            <div className="border-row">
                <Square insideValue = {props.value}/>
                <Square />
                <Square />
            </div>
            <div className="border-row">
                <Square />
                <Square />
                <Square />
            </div>
            <div className="border-row">
                <Square />
                <Square />
                <Square />
            </div>
        </div>
    )
    // we provide the value of props to our first square component
}
