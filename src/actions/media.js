export const RECEIVE_MEDIA = 'RECEIVE_MEDIA';
export const ADD_MEDIA = 'ADD_MEDIA';
export const ADD_MEDIA_FROM_CAP_JOBS = 'ADD_MEDIA_FROM_CAP_JOBS'
export const ADD_CAP_FILE_TO_MEDIA = 'ADD_CAP_FILE_TO_MEDIA'
export const ADD_MEDIA_FILE_TO_MEDIA = 'ADD_MEDIA_FILE_TO_MEDIA'
export const UPDATE_MEDIA = 'UPDATE_MEDIA'
export const UPDATE_MEDIA_DEEP = 'UPDATE_MEDIA_DEEP'
export const CLEAR_MEDIA = 'CLEAR_MEDIA'


export function receiveMedia(media) {

    return {
        type: RECEIVE_MEDIA,
        media
    }
}


export function clearMedia() {

    return {
        type: CLEAR_MEDIA,
    }

}

export function addMediaFromCapJobs(capJobs) {

    let media = Object.keys(capJobs).reduce((accumulator, element) => {
        if (capJobs[element].media !== null) {
            let id = capJobs[element].media.id
            accumulator[id] = capJobs[element].media;

        }
        return accumulator
    }, {})

    return {
        type: ADD_MEDIA_FROM_CAP_JOBS,
        media

    }


}

export function addCaptionFileToMedia(captionFile) {

    let mediaId =  captionFile[Object.keys(captionFile)[0]].media_id

    return {
        type: ADD_CAP_FILE_TO_MEDIA,
        captionFile,
        mediaId

    }

}

export function addMediaFileToMedia(mediaFile) {

    let mediaId =  mediaFile[Object.keys(mediaFile)[0]].media_id

    return {
        type: ADD_MEDIA_FILE_TO_MEDIA,
        mediaFile,
        mediaId

    }}


export function updateMedia(media) {

    let mediaId = Object.keys(media)[0]

    return {
        type: UPDATE_MEDIA,
        media,
        mediaId

    }

}

export function updateMediaDeep(media_id, key, value) {

    return {
        type: UPDATE_MEDIA_DEEP,
        media_id,
        key,
        value

    }

}