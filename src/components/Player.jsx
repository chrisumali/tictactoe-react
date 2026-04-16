import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onPlayerNameChange }){
    const [ playerName, setPlayerName ] = useState(initialName);
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

        if(isEditing){
            onPlayerNameChange(symbol, playerName);
        }
        
    }

    function handleChange(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    // let btnCaption = 'Edit';

    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}/>
        // btnCaption = 'Save';
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
              {editablePlayerName}
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
          </li>
    );
}