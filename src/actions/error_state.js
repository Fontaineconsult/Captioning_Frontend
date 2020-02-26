export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export function setErrorState(error_message) {

    return {
        type: SET_ERROR,
        error_message
    }
}

export function removeErrorState() {
    return {
        type: REMOVE_ERROR,
    }

}