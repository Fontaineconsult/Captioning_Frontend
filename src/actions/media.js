export const RECEIVE_MEDIA = 'RECEIVE_MEDIA';
export const ADD_MEDIA = 'ADD_MEDIA';


export function receiveMedia(media) {

    return {
        type: RECEIVE_MEDIA,
        media
    }
}


export function addMedia(media) {

    return {
        type: ADD_MEDIA,
        media

    }


}