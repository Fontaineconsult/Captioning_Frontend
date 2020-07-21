export const RECEIVE_REQUESTER_RESOURCES = 'RECEIVE_REQUESTER_RESOURCES';
export const CLEAR_REQUESTER_RESOURCES = 'CLEAR_REQUESTER_RESOURCES';

export function receiveRequester(requester) {

    return {
        type: RECEIVE_REQUESTER_RESOURCES,
        requester

    }

}



export function clearRequesterResources() {

    return {
        type: CLEAR_REQUESTER_RESOURCES,


    }

}