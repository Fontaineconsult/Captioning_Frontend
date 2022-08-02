import {
    _LOADINGCOURSES,
    _LOADINGILEARNVIDEOS,
    _LOADINGINSTRUCTORS,
    _LOADINGMEDIA,
    _LOADINGSTUDENTS,
    _LOADINGVIDEOJOBS,
    _LOADINGPERMISSIONS,
    _LOADINGREQUESTS, _LOADINGASTJOB, _ALLLOADINGON
} from "../actions/status";

export default function loadingStatusReducer (state={

    coursesLoading: true,
    iLearnVideosLoading: true,
    instructorsLoading: true,
    mediaLoading: true,
    studentsLoading: true,
    videoJobsLoading: true,
    userPermissionLoading: true,
    requestersLoading: true,
    astRequestsLoading: false




}, action) {

    switch (action.type) {

        case _ALLLOADINGON:
            return {

                coursesLoading: true,
                iLearnVideosLoading: true,
                instructorsLoading: true,
                mediaLoading: true,
                studentsLoading: true,
                videoJobsLoading: true,
                userPermissionLoading: false,
                requestersLoading: true,
                astRequestsLoading: false

            }


        case _LOADINGCOURSES:
            return {

                ...state,
                "coursesLoading": action.status,
            };

        case _LOADINGILEARNVIDEOS:
            return {
                ...state,
                "iLearnVideosLoading": action.status,
            };

        case _LOADINGINSTRUCTORS:
            return {
                ...state,
                "instructorsLoading": action.status,
            };
        case _LOADINGSTUDENTS:
            return {
                ...state,
                "studentsLoading": action.status,
            };

        case _LOADINGMEDIA:
            return {
                ...state,
                "mediaLoading": action.status,
            };

        case _LOADINGVIDEOJOBS:
            return {
                ...state,
                "videoJobsLoading": action.status,
            };

        case _LOADINGPERMISSIONS:
            return {
                ...state,
                "userPermissionLoading": action.status,
            };


        case _LOADINGREQUESTS:
            return {
                ...state,
                "requestersLoading": action.status,
            };


        case _LOADINGASTJOB:
            return {
                ...state,
                "astRequestsLoading": action.status,
            };


        default:
            return state
    }



}