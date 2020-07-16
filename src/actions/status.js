export const _LOADINGCOURSES = 'LOADING_COURSES';
export const _LOADINGILEARNVIDEOS = 'LOADING_ILEARN_VIDEOS';
export const _LOADINGINSTRUCTORS = 'LOADING_INSTRUCTORS';
export const _LOADINGMEDIA = 'LOADING_MEDIA';
export const _LOADINGSTUDENTS = 'LOADING_STUDENTS';
export const _LOADINGVIDEOJOBS = 'LOADING_VIDEO_JOBS';
export const _LOADINGPERMISSIONS = 'LOADING_PERMISSIONS';
export const _LOADINGREQUESTS = '_LOADINGREQUESTS';
export const _LOADINGASTJOB = '_LOADINGASTJOB'

export function LoadingCourses(status) {

    return {
        type: _LOADINGCOURSES,
        status
    }
    
}

export function LoadingIlearnVideos(status) {

    return {
        type: _LOADINGILEARNVIDEOS,
        status
    }

}

export function LoadingInstructors(status) {

    return {
        type: _LOADINGINSTRUCTORS,
        status
    }

}

export function LoadingMedia(status) {

    return {
        type: _LOADINGMEDIA,
        status
    }

}

export function LoadingStudents(status) {

    return {
        type: _LOADINGSTUDENTS,
        status
    }

}

export function LoadingVideoJobs(status) {

    return {
        type: _LOADINGVIDEOJOBS,
        status
    }

}

export function LoadingPermissions(status) {

        return {
            type: _LOADINGPERMISSIONS,
            status

        }

    }


export function LoadingRequests(status) {

    return {
        type: _LOADINGREQUESTS,
        status

    }

}

export function LoadingAstJob(status) {

    return {
        type: _LOADINGASTJOB,
        status

    }

}