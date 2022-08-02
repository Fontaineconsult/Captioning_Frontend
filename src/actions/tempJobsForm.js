export const START_TEMP_CAP_JOB = 'START_TEMP_CAP_JOB';
export const ADD_MEDIA_TO_TEMP_JOB = 'ADD_MEDIA_TO_TEMP_JOB';
export const ADD_JOB_INFO_TO_TEMP_JOB = 'ADD_JOB_INFO_TO_TEMP_JOB';
export const COMPLETE_TEMP_CAP_JOB = 'COMPLETE_TEMP_CAP_JOB';
export const ADD_MEDIA_TO_TEMP_JOB_NO_ID = "ADD_MEDIA_TO_TEMP_JOB_NO_ID"
export const CLEAR_TEMP_CAP_JOBS = "CLEAR_TEMP_CAP_JOBS";
export const CLEAR_INCOMPLETE_TEMP_CAP_JOBS = "CLEAR_INCOMPLETE_TEMP_CAP_JOBS";
export const UPDATE_TEMP_CAP_JOBS_FORM_JOBS = "UPDATE_TEMP_CAP_JOBS_FORM_JOBS";
export const REMOVE_ITEM_FROM_TEMP_CAP_JOBS = "REMOVE_ITEM_FROM_TEMP_CAP_JOBS";
export const UPDATE_TEMP_JOBS_UPLOAD_STATE = "UPDATE_TEMP_JOBS_UPLOAD_STATE";
export const START_LIST_TEMP_CAP_JOB = "START_LIST_TEMP_CAP_JOB";
export const ADD_VIDEO_TO_TEMP_LIST = "ADD_VIDEO_TO_TEMP_LIST";
export const ADD_JOB_INFO_TO_TEMP_LIST_JOB = "ADD_JOB_INFO_TO_TEMP_LIST_JOB";


export function addTempJob(temp_id, requester_id) {

    return {
        type: START_TEMP_CAP_JOB,
        temp_id,
        requester_id
    }

}


export function addListTempJob(temp_id, requester_id) {

    return {
        type: START_LIST_TEMP_CAP_JOB,
        temp_id,
        requester_id
    }

}


export function addVideoToTempList(video_info, temp_id) {


    return {
        type: ADD_VIDEO_TO_TEMP_LIST,
        temp_id,
        video_info
    }

}


export function addMediaToTempJob(media_info, temp_id) {

    return {
        type: ADD_MEDIA_TO_TEMP_JOB,
        temp_id,
        media_info

    }
}


export function addMediaToTempJobNoId(temp_id, media_info) {
    return {
        type: ADD_MEDIA_TO_TEMP_JOB_NO_ID,
        temp_id,
        media_info

    }
}


export function addJobInfoToTempListJob(temp_id, job_info) {

    return {
        type: ADD_JOB_INFO_TO_TEMP_LIST_JOB,
        temp_id,
        job_info

    }

}


export function addJobInfoToTempJob(temp_id, job_info) {

    return {
        type: ADD_JOB_INFO_TO_TEMP_JOB,
        temp_id,
        job_info

    }

}

export function updateTempJobsFormJobsInfo(temp_id, job_info) {
    return {

        type: UPDATE_TEMP_CAP_JOBS_FORM_JOBS,
        temp_id,
        job_info


    }


}

export function updateTempJobsUploadState(temp_id, upload_state) {
    return {

        type: UPDATE_TEMP_JOBS_UPLOAD_STATE,
        temp_id,
        upload_state

    }

}


export function completeTempJob(temp_id, created) {

    return {
        type: COMPLETE_TEMP_CAP_JOB,
        temp_id,
        created

    }

}

export function removeJobfromTempCapJobs(transaction_id) {

    return {
        type: REMOVE_ITEM_FROM_TEMP_CAP_JOBS,
        transaction_id: transaction_id

    }

}


export function clearIncompleteTempCapJobs() {


    return {
        type: CLEAR_INCOMPLETE_TEMP_CAP_JOBS,

    }


}


export function clearTempCapJobs() {

    return {
        type: CLEAR_TEMP_CAP_JOBS,

    }


}
