import { ADD_TASK, REMOVE_TASK, MARK_COMPLETE } from "../action/action.types";

const initialState = [];

export default ( state = initialState, action )=>{
    switch( action.type ){
        case ADD_TASK:
            return [ ...state, action.payload ];

        case REMOVE_TASK:
            return state.filter(( task )=> task.id !== action.payload );

        case MARK_COMPLETE: 
            return state.map(( task )=>{
                if( task.id == action.payload ){
                    task.isCompleted = !task.isCompleted;
                }

                return task;
            })

        default:
            return state;

    }
};