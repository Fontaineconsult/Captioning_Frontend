import fetch from "cross-fetch";
import {api_failure} from "../../utilities/api/errors";
import {endpoint} from '../../constants'
import {LoadingIlearnVideos,LoadingMedia, LoadingVideoJobs} from "../status";
import {addMediaToTempJob, updateTempJobsUploadState} from "../tempJobsForm"
import {receiveMediaSearch} from '../mediaSearch'
import { batch } from 'react-redux'
import {setErrorState} from "../error_state";
import {receiveCapJobs, addNewAstJob} from "../existingVideoJobs";
import {addMediaFromCapJobs, addCaptionFileToMedia, addMediaFileToMedia, updateMedia} from "../media";
import {v1 as uuidv1} from "uuid";

import {reFetchMediaAfterUpload} from './fetchData'


const server_url = endpoint();

function errorHandler(response, dispatch, error_id){

    if (!response.ok) {
        response.json()
            .then(data => (
                dispatch(setErrorState(data['error']['error_message'], data['request_payload'], error_id)),
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

export function AddVideoJob(requester_id, show_date, media_id, output_format, comments) {
    let data_object = { 'requester_id': requester_id,
                        'show_date': show_date,
                        'media_id': media_id,
                        'output_format': output_format,
                        'comments': comments}



    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }}

    console.log(post_object)

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
                'comments': currentJob.job_info.comments}
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

export function uploadVideoWithMediaId(video, media_id, temp_id) {

    // imports fetch statement to fetch new media info after file upload. Directly updates tempJobstate
    let post_object = {
        method: 'POST',
        body: video,
        headers: {
            'Content-Type': "video/mp4",
            'media_id': media_id
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

export function uploadMediaFromJobView(video, media_id, temp_id) {

    // imports fetch statement to fetch new media info after file upload. Directly updates tempJobstate
    let post_object = {
        method: 'POST',
        body: video,
        headers: {
            'Content-Type': "video/mp4",
            'media_id': media_id
        }};

    return dispatch => {
        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/services/upload/file}`, post_object)
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
            'Content-Type': "application/x-subrip"
        }};



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

export function addAstJobToCaptioningJob(job_id, rate, temp_id, file_id) {

    let post_object = {
        method: "POST",
        body: JSON.stringify({"jobid": job_id, "ast_rush": rate, file_id: file_id}),
        headers: {
            "Content-Type": "application/json"
        }};

    return dispatch => {
        dispatch(LoadingVideoJobs(true));
        return fetch(`${server_url}/ast-jobs`, post_object)
            .then(response => errorHandler(response, dispatch, temp_id), error => {
                console.log(error)
            })
            .then(response => {
                responseHandler(response, dispatch, [addNewAstJob], temp_id, LoadingVideoJobs)
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
