export const RECEIVE_MEDIA_SEARCH = 'RECEIVE_MEDIA_SEARCH';
export const CLEAR_MEDIA_SEARCH = 'CLEAR_MEDIA_SEARCH';


export function receiveMediaSearch(media, unique_id) {

    return {
        type: RECEIVE_MEDIA_SEARCH,
        media,
        unique_id
    }
}


export function clearMediaSearch() {
    return {
        type: CLEAR_MEDIA_SEARCH,
        action: true

    }

}