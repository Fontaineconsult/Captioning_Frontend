export const RECEIVE_TASK_ID = 'RECEIVE_TASK_ID';
export const CLEAR_TASK_ID = 'CLEAR_TASK_ID';



export function receiveTaskId(task_id, callback_list) {
    console.log("CALLLLBACCKKSSS", callback_list)
    return {
        type: RECEIVE_TASK_ID,
        task_id,
        callback_list

    }

}


export function clearTaskId(dispatch, task_id, tasks) {

    tasks.forEach(task => {
        if (task.task_id === task_id) {
            task.callback_list.forEach(callback => {
                dispatch(callback.call())
            })

        }

    })

    return {
        type: CLEAR_TASK_ID,
        task_id

    }

}
