import { ADD_TASK, REMOVE_TASK, MARK_COMPLETE } from "./action.types";

export const addTask = ( task )=>{
    return({
        type: ADD_TASK,
        payload: task
    });
};

export const removeTask = ( taskId )=>{
    return({
        type: REMOVE_TASK,
        payload: taskId
    });
};

export const markCompleted = ( taskId )=>{
    return ({
        type: MARK_COMPLETE,
        payload: taskId
    });
};