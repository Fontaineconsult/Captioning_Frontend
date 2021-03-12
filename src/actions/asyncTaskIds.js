export const RECEIVE_TASK_ID = 'RECEIVE_TASK_ID';
export const CLEAR_TASK_ID = 'CLEAR_TASK_ID';



export function receiveTaskId(task_id) {
    return {
        type: RECEIVE_TASK_ID,
        task_id

    }

}


export function clearTaskId(task_id) {

    return {
        type: CLEAR_TASK_ID,
        task_id

    }

}
