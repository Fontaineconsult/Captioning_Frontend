export const START_TEMP_CAP_JOB = 'START_TEMP_CAP_JOB';
export const ADD_MEDIA_TO_TEMP_JOB = 'ADD_MEDIA_TO_TEMP_JOB';
export const ADD_JOB_INFO_TO_TEMP_JOB = 'ADD_JOB_INFO_TO_TEMP_JOB';
export const COMPLETE_TEMP_CAP_JOB = 'COMPLETE_TEMP_CAP_JOB';
export const ADD_MEDIA_TO_TEMP_JOB_NO_ID ="ADD_MEDIA_TO_TEMP_JOB_NO_ID"



export function addTempJob(temp_id) {

    return {
        type: START_TEMP_CAP_JOB,
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



export function addMediaToTempJobNoId(temp_id, media_info) {
    console.log(temp_id, media_info)
    return {
        type: ADD_MEDIA_TO_TEMP_JOB_NO_ID,
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


export function completeTempJob(temp_id, created) {

    return {
        type: COMPLETE_TEMP_CAP_JOB,
        temp_id,
        created

    }

}
