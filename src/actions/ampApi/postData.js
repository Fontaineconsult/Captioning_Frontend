import fetch from "cross-fetch";
import {api_failure} from "../../utilities/api/errors";
import {endpoint} from '../../constants'
import {LoadingMedia, LoadingVideoJobs, LoadingAstJob, LoadingInstructors} from "../status";
import {addMediaToTempJob, updateTempJobsUploadState} from "../tempJobsForm"
import {receiveMediaSearch} from '../mediaSearch'
import { batch } from 'react-redux'
import {setErrorState} from "../error_state";
import {receiveCapJobs, addNewAstJob} from "../existingVideoJobs";
import {addMediaFromCapJobs, addCaptionFileToMedia, addMediaFileToMedia, updateMedia, receiveMedia} from "../media";
import {updateEmployees} from "../employees"
import {receiveTaskId, clearTaskId} from "../asyncTaskIds";
import {v1 as uuidv1} from "uuid";
import store from "../../reducers/store_creator"
import {reFetchMediaAfterUpload, fetchMediaById} from './fetchData'
import {receiveRequester} from "../requester";
import AsyncJobChecker from "../../middleware/taskStatusCheck"


const server_url = endpoint();
const jobChecker = new AsyncJobChecker()

function errorHandler(response, dispatch, error_id){

    if (!response.ok) {
        response.json()
            .then(data => (

                dispatch(
                    setErrorState(data['error']['error_message'], data['request_payload'], error_id)),
                alert(data['error']['error_message']))

            )

    }
    return response
}

function responseHandler(response, dispatch, reducer, unique_id, statusReducer) {

    if (response.ok) {
        response.json()
            .then(data => {reducer.forEach(
                cur_reducer => {
                    dispatch(cur_reducer(data['content'], unique_id))})})
            .then(data => dispatch(statusReducer(false)))
    }
    return response

}

export function AddVideoJob(requester_id, show_date, media_id, output_format, comments, semester) {
    let data_object = { 'requester_id': requester_id,
                        'show_date': show_date,
                        'media_id': media_id,
                        'output_format': output_format,
                        'comments': comments,
                        'semester': semester}



    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }}



    return dispatch => {

        dispatch(LoadingVideoJobs(true))
        return fetch(`${server_url}/video-jobs`, post_object)
            .then(data => console.log(JSON.stringify(data)))
            .then(() => dispatch(LoadingVideoJobs(false)))
            .catch(error => api_failure(error))


    }

};

export function AddVideoJobBatch(jobsReducer) {

    let error_id = uuidv1()

    let data_objects = Object.keys(jobsReducer).map(job => {
        let currentJob = jobsReducer[job]
        if (currentJob.meta.created === true) {

            let data_object = {
                'requester_id':  parseInt(currentJob.job_info.requester_id, 10),
                'show_date': currentJob.job_info.show_date,
                'media_id': parseInt(currentJob.video.id, 10),
                'output_format': currentJob.job_info.delivery_format,
                'comments': currentJob.job_info.comments,
                'semester': currentJob.job_info.semester}
                
            return {
                method: 'POST',
                body: JSON.stringify(data_object),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }

    });

    return (dispatch, getState) => {

        dispatch(LoadingVideoJobs(true))
        batch(() => {
            data_objects.forEach(object => {
                return fetch(`${server_url}/video-jobs`, object)
                    .then(response => errorHandler(response, dispatch, error_id), error => {console.log(error)})
                    .then(response => {responseHandler(response, dispatch, [receiveCapJobs, addMediaFromCapJobs], error_id, LoadingVideoJobs)})

            })
        });
        dispatch(LoadingVideoJobs(false))

    }


};
// Zoprs
export function AddEmployee(employee_data) {
    let temp_id = uuidv1()

    console.log(employee_data)
    let data_object = { 'employee_id': employee_data.employeeId,
        'employee_first_name': employee_data.firstName,
        'employee_last_name': employee_data.lastName,
        'employee_email': employee_data.email,
        'employee_phone': employee_data.phoneNumber}

    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }}

    return dispatch => {

        dispatch(LoadingInstructors(true))
        return fetch(`${server_url}/employees?`, post_object)
            .then(response => {if (response.ok){
                fetch(`${server_url}/employees?employee_id=all`).then(
                    response => errorHandler(response, dispatch, temp_id), error => {console.log(error)})
                    .then(
                        response => {responseHandler(response, dispatch, [updateEmployees], temp_id, LoadingInstructors)}
                )
            } else {alert("Something went wrong when adding Employee")} })

    }

}

export function addMediaToDBandTempJob(title, link, type, temp_id) {

    let data_object
    if (type === 'URL') {
        data_object = { title:title, source_url:link, media_type: type};

    }
    if (type === 'File') {

        data_object = {title:title, sha_256_hash:link, media_type: type};
    }


    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};


    return dispatch => {
        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/media`, post_object)
            .then(response => errorHandler(response, dispatch, temp_id), error => {
                console.log(error)
            })
            .then(response => {
                responseHandler(response, dispatch, [receiveMediaSearch, addMediaToTempJob], temp_id, LoadingMedia)
            })
        }
};

export function uploadVideoWithMediaId(video, media_id, temp_id, content_type) {

    // imports fetch statement to fetch new media info after file upload. Directly updates tempJobstate
    let post_object = {
        method: 'POST',
        body: video,
        headers: {
            'Content-Type': content_type,
            'Media-Id': media_id
        }};

    return dispatch => {
        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/upload/file`, post_object)
            .then(response => errorHandler(response, dispatch, temp_id), error => {console.log(error)})
            .then(response => {
                dispatch(updateTempJobsUploadState(temp_id, true),
                dispatch(LoadingMedia(false)))
                dispatch(reFetchMediaAfterUpload(media_id, temp_id))
            })
}
}

export function uploadMediaFromJobView(video, media_id, temp_id, content_type, sha_256_hash) {

    // imports fetch statement to fetch new media info after file upload. Directly updates tempJobstate
    let post_object = {
        method: 'POST',
        body: video,
        headers: {
            'Content-Type': content_type,
            'Media-Id': media_id
        }};

    return dispatch => {
        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/upload/file`, post_object)
            .then(response => {if (response.ok){
                fetch(`${server_url}/media-objects?media_id=${media_id}`).then(
                    response => errorHandler(response, dispatch, temp_id), error => {console.log(error)})
                    .then(
                        response => {responseHandler(response, dispatch, [addMediaFileToMedia], temp_id, LoadingMedia)}
                    )
            } else {alert("Something went wrong with upload")} } )
    }
}

export function uploadCaptionFileWithMediaId(captionFile, media_id, temp_id) {

    let post_object = {
        method: 'POST',
        body: captionFile,
        headers: {

        }
    };



    return dispatch => {
        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/upload/caption?media_id=${media_id}`, post_object)
            .then(response => {if (response.ok){
                fetch(`${server_url}/media-objects?media_id=${media_id}`).then(
                    response => errorHandler(response, dispatch, temp_id), error => {console.log(error)})
                    .then(
                        response => {responseHandler(response, dispatch, [addCaptionFileToMedia], temp_id, LoadingMedia)}

                    )
            } else {alert("Something went wrong with upload")} } )

    }

}

export function addAstJobToCaptioningJob(job_id, rate, transcriber_notes, temp_id, file_id) {

    let post_object = {
        method: "POST",
        body: JSON.stringify({"jobid": job_id, "ast_rush": rate, file_id: file_id, "ast_notes":transcriber_notes}),
        headers: {
            "Content-Type": "application/json"
        }};
    return dispatch => {
        dispatch(LoadingAstJob(true));
        return fetch(`${server_url}/ast-jobs`, post_object)
            .then(response => errorHandler(response, dispatch, temp_id), error => {
                console.log(error)
            })
            .then(response => {
                responseHandler(response, dispatch, [addNewAstJob], temp_id, LoadingAstJob)
            })
    }

}

export function createAmaraResource(media_id, file_id) {

    let error_id = uuidv1()
    let post_object
    if (file_id === undefined) {

        post_object = {
            method: "POST",
            body: JSON.stringify({"action": "create-amara-resource", "media_id": media_id}),
            headers: {
                'Content-Type': 'application/json'
            }};

    } else {

        post_object = {
            method: "POST",
            body: JSON.stringify({"action": "create-amara-resource", "media_id": media_id, "file_id": file_id}),
            headers: {
                'Content-Type': 'application/json'
            }};
    }


    return dispatch => {
        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/amara`, post_object)
            .then(response => {if (response.ok){
                fetch(`${server_url}/media?id=${media_id}`).then(
                    response => errorHandler(response, dispatch, error_id), error => {console.log(error)})
                    .then(
                        response => {responseHandler(response, dispatch, [updateMedia], error_id, LoadingMedia)}

                    )
            } else {alert("Something went wrong with upload")} } )

    }


}

export function addSRTtoAmaraResource(caption_id, amara_id, media_id) {
    let error_id = uuidv1()
    let post_object = {
        method: "POST",
        body: JSON.stringify({"action": "attach-amara-caption", "caption_id": caption_id, "amara_id": amara_id}),
        headers: {
            'Content-Type': 'application/json'
        }};

    console.log(caption_id, amara_id, media_id)

    return dispatch => {

        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/amara`, post_object)
            .then(response => {if (response.ok){
                fetch(`${server_url}/media?id=${media_id}`).then(
                    response => errorHandler(response, dispatch, error_id), error => {console.log(error)})
                    .then(
                        response => {responseHandler(response, dispatch, [updateMedia], error_id, LoadingMedia)}
                    )
            } else {alert("Something went wrong with upload")} } )

}}

export function sendVideoExtractRequest(media_id, url, format) {
    let error_id = uuidv1()
    let data_object = { media_id:media_id, url:url, format:format};

    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};

    return dispatch => {
        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/extract`, post_object)
            .then(response => {if (response.ok){
                fetch(`${server_url}/media?id=${media_id}`).then(
                    response => errorHandler(response, dispatch, error_id), error => {console.log(error)})
                    .then(
                        response => {responseHandler(response, dispatch, [updateMedia], error_id, LoadingMedia)}
                    )
            } else {alert("Something went wrong with upload")} } )

    }
};

export function addCampusAssociationAssignment(campus_org_id, employee_id, semester) {

    let error_id = uuidv1()
    let data_object = {campus_org_id:campus_org_id, employee_id:employee_id};
    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};

    return dispatch => {
        dispatch(LoadingInstructors(true));
        return fetch(`${server_url}/campus-org-assignment`, post_object)
            .then(response => {if (response.ok){
                fetch(`${server_url}/requesters?employee_id=all&semester=${semester}`).then(
                    response => errorHandler(response, dispatch, error_id), error => {console.log(error)})
                    .then(
                        response => {responseHandler(response, dispatch, [receiveRequester], error_id, LoadingInstructors)}
                    )
            } else {alert("Something went wrong with upload")} } )


}
}


export function sendVideoExtractRequestDeferred(media_id, url, format) {
    let error_id = uuidv1()
    let data_object = { media_id:media_id, url:url, format:format};

    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};

    return dispatch => {

        return fetch(`${server_url}/services/extract-deferred`, post_object)
            .then(response => response.text())
            .then(task_id => dispatch(receiveTaskId(task_id, [fetchMediaById.bind(null,media_id)])))
            .then(() => checkAsyncStatusResource(dispatch))

    }
}


export function sendVideoConversionRequestDeferred(media_file_id, media_id, task) {
    let error_id = uuidv1()

    let data_object = {media_file_id:media_file_id, media_id:media_id, task:task};

    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};
        console.log("THE POST OBHECT", post_object)
    return dispatch => {

        return fetch(`${server_url}/services/convert`, post_object)
            .then(response => response.text())
            .then(task_id => dispatch(receiveTaskId(task_id, [fetchMediaById.bind(null,media_id)])))
            .then(() => checkAsyncStatusResource(dispatch))

    }
}

export function sendOpenCaptionRequestDeferred(media_id, video_file_id, caption_file_id) {
    let error_id = uuidv1()
    let data_object = {media_id :media_id, video_file_id:video_file_id, caption_file_id:caption_file_id};

    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};

    return dispatch => {

        return fetch(`${server_url}/services/open-caption`, post_object)
            .then(response => response.text())
            .then(task_id => dispatch(receiveTaskId(task_id, [fetchMediaById.bind(null,media_id)])))
            .then(() => checkAsyncStatusResource(dispatch))

    }
}


export function checkAsyncStatusResource(dispatch) {
    let error_id = uuidv1()

    let data_object = store.getState().asyncTaskIdReducer;

    let task_id_list = data_object.map(object => {
        return object.task_id
    },[])

    let post_object = {
        method: 'POST',
        body: JSON.stringify({"task_id":task_id_list}),
        headers: {
            'Content-Type': 'application/json'
        }};



        return fetch(`${server_url}/services/task-status`, post_object)
            .then(response => response.json())
            .then(json => jobChecker.addInitialStatus(json))


}

