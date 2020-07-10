export const RECEIVE_VIDEO_JOBS = 'RECEIVE_VIDEO_JOBS';
export const UPDATE_VIDEO_JOBS = 'UPDATE_VIDEO_JOBS';
export const ADD_NEW_AST_JOB = 'ADD_NEW_AST_JOB';
export const ADD_AST_ID_TO_AST_JOB = 'ADD_AST_ID_TO_AST_JOB'
export const DELETE_CAP_JOB = 'DELETE_CAP_JOB'

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


export function deleteCapJob(job_id) {


    return {
        type: DELETE_CAP_JOB,
        job_id: String(job_id),


    }
}

export function addNewAstJob(astJob, unique_id) {

    let caption_job_id = astJob[Object.keys(astJob)[0]].caption_job_id
    let ast_job = astJob[Object.keys(astJob)[0]]
    console.log("DERJPNB", ast_job, caption_job_id)
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