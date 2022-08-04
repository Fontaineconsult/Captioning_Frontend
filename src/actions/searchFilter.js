export const RECEIVE_SOURCE_URL_DATA = 'RECEIVE_SOURCE_URL_DATA';
export const CLEAR_SOURCE_URL_DATA = "CLEAR_SOURCE_URL_DATA"


export function receiveSourceURLData(data) {

    return {
        type: RECEIVE_SOURCE_URL_DATA,
        data

    }


}


export function clearSourceUrlData() {
    return {
        type: CLEAR_SOURCE_URL_DATA
    }
}