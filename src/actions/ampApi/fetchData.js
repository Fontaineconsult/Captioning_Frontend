import {receiveCourses} from '../courses'
import {receiveEmployees} from '../employees'
import {receiveCapJobs, replaceCapJobData} from '../existingVideoJobs'
import receiveStudents from '../students'
import {receiveIlearnVideos} from '../ilearn_videos'
import {addMediaFromCapJobs, receiveMedia} from '../media'
import {receiveRequester} from '../requester'
import receiveRequesterResources from '../requests'
import {
    LoadingCourses,
    LoadingIlearnVideos,
    LoadingInstructors,
    LoadingMedia,
    LoadingPermissions,
    LoadingRequests,
    LoadingVideoJobs
} from '../status'
import receiveUserPermissions from '../userPermission'
import {endpoint} from '../../constants'
import {setErrorState} from '../error_state'
import {receiveMediaSearch} from '../mediaSearch'
import {receiveCampusOrgs} from '../campusOrgs'
import {addMediaToTempJob} from '../tempJobsForm'
import download from 'downloadjs';

import {v1 as uuidv1} from 'uuid';

import fetch from "cross-fetch";
import {receiveVideoList} from "../videoLists";
import {clearSourceUrlData, receiveSourceURLData} from "../searchFilter";


const server_url = endpoint();


function checkResponse(data) {

    if (data['content'] !== null) {
        return data['content']
    } else {
        console.log("ERROR", data['error'])
        // error stuff here
    }
}


function errorHandler(response, dispatch, error_id, statusReducer) {

    if (!response.ok) {
        response.json()
            .then(data => dispatch(setErrorState(data['error']['message'], data['request_payload'], error_id)))
            .then(data => dispatch(statusReducer(false)))
    }
    return response
}


function responseHandler(response, dispatch, reducer, unique_id, statusReducer) {

    if (response.ok) {
        response.json()
            .then(data => {
                reducer.forEach(cur_reducer => {
                    dispatch(cur_reducer(data['content'], unique_id))
                })
            })
            .then(data => dispatch(statusReducer(false)))
    }

    return response

}

export function fetchCourseByCourseGenId(courseGenId) {
    return dispatch => {

        dispatch(receiveCourses());
        dispatch(LoadingCourses(true))
        return fetch(`${server_url}/courses?course_gen_id=${courseGenId}`)
            .then(response => response.json())
            .then(data => checkResponse(data))
            .then(data => dispatch(receiveCourses(data)))
            .then(() => dispatch(LoadingCourses(false)))
            .then(data => console.log(data))

    }
}

export function permissionDiscovery(id) {

    return dispatch => {

        return fetch(`${server_url}/permission?id=${id}`)
            .then(response => response.json())
            .then(data => checkResponse(data))
            .then(data => dispatch(receiveUserPermissions(data)))
            .then(() => dispatch(LoadingPermissions(false)))
            .then(data => console.log(data))

    }

}

export function assetDiscovery(id) {

    return dispatch => {

        return fetch(`${server_url}/requesters?employee_id=${id}`)
            .then(response => response.json())
            .then(data => dispatch(receiveRequester(data)))
            .then(data => console.log(data))
    }
}

export function allAssetDiscovery(semester) {

    return dispatch => {
        dispatch(LoadingRequests(true))
        return fetch(`${server_url}/requesters?employee_id=all&semester=${semester}`)
            .then(response => response.json())
            .then(data => dispatch(receiveRequester(data['content'])))
            .then(data => dispatch(LoadingRequests(false)))
            .then(data => console.log(data))
    }
}

export function fetchAllCourses(semester) {

    return dispatch => {

        dispatch(receiveCourses());
        dispatch(LoadingCourses(true))
        return fetch(`${server_url}/courses?semester=${semester}`)
            .then(response => response.json())
            .then(data => checkResponse(data))
            .then(data => dispatch(receiveCourses(data)))
            .then(() => dispatch(LoadingCourses(false)))
            .then(data => console.log(data))
    }

}

export function fetchCoursesbyInstructorId(instructor_id) {

    return dispatch => {

        dispatch(receiveCourses());
        return fetch(`${server_url}/courses?instructor_id=${instructor_id}`)
            .then(response => response.json())
            .then(data => dispatch(receiveCourses(data)))
            .then(data => console.log(data))

    }
}

export function fetchAllVideoJobsBySemester(semester) {

    let error_id = uuidv1()

    return dispatch => {
        dispatch(LoadingVideoJobs(true))
        dispatch(LoadingMedia(false))
        return fetch(`${server_url}/video-jobs?semester=${semester}&requester_id=all`)
            .then(response => errorHandler(response, dispatch, error_id, LoadingVideoJobs), error => {
                console.log(error)
            })
            .then(response => (responseHandler(response, dispatch, [receiveCapJobs, addMediaFromCapJobs], error_id, LoadingVideoJobs)))
            .then(data => console.log(data))
    }
}


export function fetchJobsByRequesterId(requester_id) {

    let error_id = uuidv1()

    return dispatch => {
        dispatch(LoadingVideoJobs(true))
        dispatch(LoadingMedia(false))
        return fetch(`${server_url}/video-jobs?requester_id=${requester_id}`)
            .then(response => errorHandler(response, dispatch, error_id, LoadingVideoJobs), error => {
                console.log(error)
            })
            .then(response => (responseHandler(response, dispatch, [replaceCapJobData], error_id, LoadingVideoJobs)))
            .then(data => console.log(data))
    }
}


export function fetchStudent(student_id) {

    return dispatch => {

        dispatch(receiveStudents());
        return fetch(`${server_url}/students?student_id=${student_id}`)
            .then(response => response.json())
            .then(data => dispatch(receiveStudents(data)))
            .then(data => console.log(data))

    }
}

export function fetchAllStudents() {

    return dispatch => {

        dispatch(receiveStudents());
        return fetch(`${server_url}/students?student_id=all`)
            .then(response => response.json())
            .then(data => dispatch(receiveStudents(data)))
            .then(data => console.log(data))

    }

}


export function fetchIlearnVideosBySemester(semester) {
    let error_id = uuidv1()
    return dispatch => {
        dispatch(receiveIlearnVideos());
        dispatch(LoadingIlearnVideos(true))
        return fetch(`${server_url}/ilearn-videos?semester=${semester}`)
            .then(response => errorHandler(response, dispatch, error_id, LoadingIlearnVideos), error => {
                console.log(error)
            })
            .then(response => (responseHandler(response, dispatch, [receiveIlearnVideos], error_id, LoadingIlearnVideos)))


    }

}

export function fetchiLearnVideosByInstructorId(instructor_id, semester) {

    return dispatch => {

        dispatch(receiveIlearnVideos());
        dispatch(LoadingIlearnVideos(true))

        return fetch(`${server_url}/ilearn-videos?instructor_id=${instructor_id}&semester=${semester}`)
            .then(response => response.json())
            .then(data => dispatch(receiveIlearnVideos(data)))
            .then(() => dispatch(LoadingIlearnVideos(false)))
            .then(data => console.log(data))

    }

}

export function fetchiLearnVideosByCourseGenId(CourseGenId) {

    return dispatch => {
        dispatch(receiveIlearnVideos());
        dispatch(LoadingIlearnVideos(true))
        return fetch(`${server_url}/ilearn-videos?course_gen_id=${CourseGenId}`)
            .then(response => response.json())
            .then(data => checkResponse(data))
            .then(data => dispatch(receiveIlearnVideos(data)))
            .then(() => dispatch(LoadingIlearnVideos(false)))
            .then(data => console.log(data))
    }

}

export function fetchMediaById(id) {
    let unique_id = uuidv1()
    console.log("MEDIA SEARCH", id)
    return dispatch => {
        dispatch(receiveMedia());
        return fetch(`${server_url}/media?id=${id}`)
            .then(response => errorHandler(response, dispatch, unique_id, LoadingMedia), error => {
                console.log(error)
            })
            .then(response => responseHandler(response, dispatch, [receiveMedia], unique_id, LoadingMedia))


    }

}

export function fetchMediaBySourceUrl(url, unique_id) {

    return dispatch => {
        dispatch(LoadingMedia(true))
        return fetch(`${server_url}/media?source_url=${url}`)
            .then(response => errorHandler(response, dispatch, unique_id, LoadingMedia), error => {
                console.log(error)
            })
            .then(response => responseHandler(response, dispatch, [receiveMediaSearch], unique_id, LoadingMedia))


    }
}


export function fetchMediaByShaHash(hash, unique_id) {

    return dispatch => {
        dispatch(LoadingMedia(true))
        return fetch(`${server_url}/media?sha_256_hash=${hash}`)
            .then(response => errorHandler(response, dispatch, unique_id, LoadingMedia), error => {
                console.log(error)
            })
            .then(response => responseHandler(response, dispatch, [receiveMediaSearch], unique_id, LoadingMedia))


    }
}


export function fetchAllOrgs() {
    return dispatch => {
        return fetch(`${server_url}/campus-orgs`)
            .then(response => response.json())
            .then(data => dispatch(receiveCampusOrgs(data['content'])))
            .then(data => console.log(data))

    }


}

export function fetchAllEmployees() {

    return dispatch => {
        return fetch(`${server_url}/employees?employee_id=all`)
            .then(response => response.json())
            .then(data => dispatch(receiveEmployees(data['content'])))
            .then(() => dispatch(LoadingInstructors(false)))
            .then(data => console.log(data))
    }

}


export function fetchEmployeeRequests(employee_id) {

    return dispatch => {
        dispatch(LoadingRequests(true));
        return fetch(`${server_url}/captioning-requests?employee_id=${employee_id}`)
            .then(response => response.json())
            .then(data => dispatch(receiveRequesterResources(data['content'])))
            .then(() => dispatch(LoadingRequests(false)))
    }

}

export function reFetchMediaAfterUpload(media_id, unique_id) {
    // Refetch the media query to get new upload info and add the media info to the current temp job

    return dispatch => {
        dispatch(LoadingRequests(true));
        return fetch(`${server_url}/media?id=${media_id}`)
            .then(response => errorHandler(response, dispatch, unique_id, LoadingMedia), error => {
                console.log(error)
            })
            .then(response => responseHandler(response, dispatch, [addMediaToTempJob], unique_id, LoadingMedia))
    }

}

export function downloadCaptionFile(item_id, media_id) {


    return dispatch => {

        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/download/caption?item_id=${item_id}&media_id=${media_id}`)
            .then(function (response) {
                response.blob().then(
                    function (blob) {
                        download(blob, response.headers.get('Content-Disposition').split("filename=")[1].replace('"', '').replace('"', ''), 'text/plain')
                    }
                )
            })
            .then(() => dispatch(LoadingMedia(false)))
    }

}

export function downloadMediaFile(item_id, media_id) {


    return dispatch => {

        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/download/file?item_id=${item_id}&media_id=${media_id}`)
            .then(function (response) {
                response.blob().then(
                    function (blob) {
                        download(blob, response.headers.get('Content-Disposition').split("filename=")[1].replace('"', '').replace('"', ''), 'video/mp4')
                    }
                )
            })
            .then(() => dispatch(LoadingMedia(false)))
    }

}

export function getVideoList(list_id, task) {


    return dispatch => {
        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/youtube?task=${task}&playlistid=${list_id}`)
            .then(response => response.json())
            .then(data => dispatch(receiveVideoList(data)))
            .then(data => console.log(data))
            .then(data => dispatch(LoadingMedia(false)))

    }
}


export function fetchDataFromSourceUrl(source_url) {
    return dispatch => {

        dispatch(clearSourceUrlData());


        return fetch(`${server_url}/media?source_url=${source_url}`)
            .then(response => response.json())
            .then(data => checkResponse(data))
            .then(data => dispatch(receiveSourceURLData(data)))
            .then(data => console.log("data is ", data))


    }
}