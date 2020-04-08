export const RECEIVE_VIDEO_JOBS = 'RECEIVE_VIDEO_JOBS';
export const UPDATE_VIDEO_JOBS = 'UPDATE_VIDEO_JOBS';


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
