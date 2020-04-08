export const RECEIVE_MEDIA = 'RECEIVE_MEDIA';
export const ADD_MEDIA = 'ADD_MEDIA';
export const ADD_MEDIA_FROM_CAP_JOBS = 'ADD_MEDIA_FROM_CAP_JOBS'


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