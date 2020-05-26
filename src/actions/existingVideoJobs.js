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


