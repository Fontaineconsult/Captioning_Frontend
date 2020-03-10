export const RECEIVE_MEDIA_SEARCH = 'RECEIVE_MEDIA_SEARCH';



export function receiveMediaSearch(media, unique_id) {

    return {
        type: RECEIVE_MEDIA_SEARCH,
        media,
        unique_id

    }
}