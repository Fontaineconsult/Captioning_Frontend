export const ADD_CAP_JOB_MEDIA = 'ADD_CAP_JOB_MEDIA';
export const ADD_CAP_JOB = 'ADD_CAP_JOB';
export const ADD_TEMP_CAP_JOB = 'ADD_TEMP_CAP_JOB';

// use to add new jobs before submitting to DB


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
