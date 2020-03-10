export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export function setErrorState(error_message, error_id) {

    return {
        type: SET_ERROR,
        error_message,
        error_id
    }
}

export function removeErrorState() {
    return {
        type: REMOVE_ERROR,
    }

}