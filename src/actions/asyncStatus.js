export const RECEIVE_NEW_STATUS = 'RECEIVE_NEW_STATUS';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const REMOVE_STATUS = 'REMOVE_STATUS';


export function addStatusUpdate(status) {
    console.log("status ID", status)
    return {
        type: RECEIVE_NEW_STATUS,
        status

    }

}


export function removeStatusUpdate(status) {

    return {
        type: REMOVE_STATUS,
        status

    }

}
