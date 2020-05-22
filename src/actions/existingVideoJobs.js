export const RECEIVE_VIDEO_JOBS = 'RECEIVE_VIDEO_JOBS';
export const UPDATE_VIDEO_JOBS = 'UPDATE_VIDEO_JOBS';
export const ADD_NEW_AST_JOB = 'ADD_NEW_AST_JOB';

// used to manage existing jobs retreived from DB

export function receiveCapJobs(videos) {

    return {
        type: RECEIVE_VIDEO_JOBS,
        videos

    }
}


export function updateCapJob(job_id, column, value) {

    return {
        type: UPDATE_VIDEO_JOBS,
        job_id,
        column,
        value

    }
}

export function addNewAstJob(job_id, astJob) {

    return {
        type: ADD_NEW_AST_JOB,
        job_id,
        astJob

    }
}


