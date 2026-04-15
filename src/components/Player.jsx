import { useState } from "react";

export default function Player({ name, symbol }){
    const [ isEditing, setIsEditing ] = useState(false);

    function handleEditClick(){

        //wrong implementation
        //since we are still in the same execution cycle, isEditing's value is still false and react is scheduling the execution 
        //setIsEditing(!isEditing); //expectation: false => true; reality: false => true
        //setIsEditing(!isEditing); //expectation: true => false; reality: false => true

        //other scenario
        //react team's correct way of handling value inversion
        //setIsEditing((editing) => !editing); //false => true
        //setIsEditing((editing) => !editing); //true => false

        //correct implementation
        setIsEditing((editing) => !editing);
    }

    let playerName = <span className="player-name">{name}</span>;
    // let btnCaption = 'Edit';

    if(isEditing){
        playerName = <input type="text" required value={name}/>
        // btnCaption = 'Save';
    }

    return (
        <li>
            <span className="player">
              {playerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
          </li>
    );
}