import React from "react";
import Board from "./Board";

export default class Game extends React.Component {     // class based component
    constructor(props) {
        super(props)
        this.state = {               // states are points we need to keep track of in the logic
            xIsNext: true,          // Lets say the game starts with X turn
            stepNumber: 0,          // number of steps at start of game
            history: [
                { squares: Array(9).fill(null) },        // initializing the array of squares with null
            ]
        }
    }

someFunction = () => {
    return 5
}

    render() {              // class components are returned using render()
        const result = this.someFunction()
        return (      
            <div className="game" >
                <div className="game-board">
                    <Board value = {result}/>       
                </div>
            </div>
        )
    }
    // in board component, we are passing a value using JSX which will be taken on by its child (board in this case) using props 
}