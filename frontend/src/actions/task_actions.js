import * as TasksUtil from '../util/tasks_util';

export const RECEIVE_ALL_TASKS = "RECEIVE_ALL_TASKS";
export const RECEIVE_TASK = "RECEIVE_TASK";
export const REMOVE_TASK = "REMOVE_TASK"

const receiveAllTasks = ({ data }) => ({
    type: RECEIVE_ALL_TASKS,
    user: data
});

const receiveTask = ({ data }) => ({
    type: RECEIVE_TASK,
    user: data
});

// const removeTask = ({ data }) => ({
    // type: REMOVE_TASK,
    // user: data
//})

// thunk action creator
export const fetchAllTasks = () => dispatch => {
    return TasksUtil.fetchAllTasks()
        .then(tasks => dispatch(receiveAllTasks(tasks)))
};

export const fetchTask = () => dispatch => {
    return TasksUtil.fetchTask()
        .then(task => dispatch(receiveTask(task)))
};