export const ADD_TEMP_CAP_JOB = 'ADD_CAP_JOB';
export const ADD_MEDIA_TO_TEMP_JOB = 'ADD_MEDIA_TO_TEMP_JOB';
export const ADD_JOB_INFO_TO_TEMP_JOB = 'ADD_JOB_INFO_TO_TEMP_JOB';



export function addTempJob(temp_id) {

    return {
        type: ADD_TEMP_CAP_JOB,
        temp_id
    }

}

export function addMediaToTempJob(temp_id, media_info) {

    return {
        type: ADD_MEDIA_TO_TEMP_JOB,
        temp_id,
        media_info

    }

}

export function addJobInfoToTempJob(temp_id, job_info) {

    return {
        type: ADD_JOB_INFO_TO_TEMP_JOB,
        temp_id,
        job_info

    }

}
