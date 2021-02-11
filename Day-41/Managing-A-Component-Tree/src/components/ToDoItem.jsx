import React, { useState } from "react";

function ToDoItem( props ){

    // const [ isDone, setIsDone ] = useState( false );

    // function handleClick(){
    //     setIsDone( ( previousValue )=>{
    //         return !previousValue;
    //     });
    // }

    // return (
    //     <div onClick={ handleClick }>
    //         <li style={{ textDecoration: isDone ? "line-through" : null }}>{props.item}</li>
    //     </div>
    // );

    function handleClick(){

    }

    return (
        <div onClick={ ()=>{
                // test here without arrow function...
             props.onChecked( props.id );
        }}> 
            <li>{props.item}</li>
        </div>
    );
}

export default ToDoItem;