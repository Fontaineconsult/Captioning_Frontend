export const RECEIVE_REQUESTER_RESOURCES = 'RECEIVE_REQUESTER_RESOURCES';


export default function receiveRequesterResources(requester) {

    return {
        type: RECEIVE_REQUESTER_RESOURCES,
        requester

    }


}
