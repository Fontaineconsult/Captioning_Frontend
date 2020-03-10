export const ADD_CAP_JOB_MEDIA = 'ADD_CAP_JOB_MEDIA';
export const ADD_CAP_JOB = 'ADD_CAP_JOB';

export function addCapJobMedia(media) {

    return {
        type: ADD_CAP_JOB_MEDIA,
        media

    }


}

export function addCapJob(job) {

    return {
        type: ADD_CAP_JOB,
        job

    }


}