export const START_TEMP_CAP_JOB = 'START_TEMP_CAP_JOB';
export const ADD_MEDIA_TO_TEMP_JOB = 'ADD_MEDIA_TO_TEMP_JOB';
export const ADD_JOB_INFO_TO_TEMP_JOB = 'ADD_JOB_INFO_TO_TEMP_JOB';
export const COMPLETE_TEMP_CAP_JOB = 'COMPLETE_TEMP_CAP_JOB';
export const ADD_MEDIA_TO_TEMP_JOB_NO_ID = "ADD_MEDIA_TO_TEMP_JOB_NO_ID"
export const CLEAR_TEMP_CAP_JOBS = "CLEAR_TEMP_CAP_JOBS";
export const CLEAR_INCOMPLETE_TEMP_CAP_JOBS = "CLEAR_INCOMPLETE_TEMP_CAP_JOBS";
export const UPDATE_TEMP_CAP_JOBS_FORM_JOBS = "UPDATE_TEMP_CAP_JOBS_FORM_JOBS";
export const  REMOVE_ITEM_FROM_TEMP_CAP_JOBS = "REMOVE_ITEM_FROM_TEMP_CAP_JOBS"



export function addTempJob(temp_id, requester_id) {

    return {
        type: START_TEMP_CAP_JOB,
        temp_id,
        requester_id
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

export function updateTempJobsFormJobsInfo(temp_id, job_info) {
    return {

        type: UPDATE_TEMP_CAP_JOBS_FORM_JOBS,
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
