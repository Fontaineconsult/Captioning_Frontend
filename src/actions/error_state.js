export const SET_ERROR = 'SET_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export function setErrorState(error_message, request_payload,  error_id) {

    return {
        type: SET_ERROR,
        error_message,
        request_payload,
        error_id
    }
}

export function removeErrorState(transaction_id) {
    return {
        type: REMOVE_ERROR,
        transaction_id
    }

}