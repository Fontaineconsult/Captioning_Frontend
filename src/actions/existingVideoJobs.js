export const RECEIVE_VIDEO_JOBS = 'RECEIVE_VIDEO_JOBS';
export const UPDATE_VIDEO_JOBS = 'UPDATE_VIDEO_JOBS';
export const ADD_NEW_AST_JOB = 'ADD_NEW_AST_JOB';
export const ADD_AST_ID_TO_AST_JOB = 'ADD_AST_ID_TO_AST_JOB'
export const DELETE_CAP_JOB = 'DELETE_CAP_JOB'
export const CLEAR_CAP_JOBS = 'CLEAR_CAP_JOBS'
export const REPLACE_CAP_JOB_DATA = 'REPLACE_CAP_JOB_DATA'

// used to manage existing jobs retreived from DB

export function receiveCapJobs(videos) {

    return {
        type: RECEIVE_VIDEO_JOBS,
        videos

    }
}


export function clearCapJobs() {
    return {
        type: CLEAR_CAP_JOBS

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

export function replaceCapJobData(data) {
    console.log("DATAAA", data)

    return {
        type: REPLACE_CAP_JOB_DATA,
        data

    }
}



export function deleteCapJob(job_id) {


    return {
        type: DELETE_CAP_JOB,
        job_id: String(job_id),


    }
}

export function addNewAstJob(astJob, unique_id) {

    let caption_job_id = astJob[Object.keys(astJob)[0]].caption_job_id
    let ast_job = astJob[Object.keys(astJob)[0]]

    return {
        type: ADD_NEW_AST_JOB,
        job_id: caption_job_id,
        astJob: ast_job

    }
}


export function initASTJob(unique_ast_job_id, ast_job_id, job_id) {

    return {
        type: ADD_AST_ID_TO_AST_JOB,
        unique_ast_job_id,
        ast_job_id,
        job_id
    }



}