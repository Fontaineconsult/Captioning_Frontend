import fetch from "cross-fetch";
import {api_failure} from "../../utilities/api/errors";
import {serverURL} from '../../constants'
import {LoadingIlearnVideos,LoadingMedia, LoadingVideoJobs} from "../status";
import {addMediaToTempJob} from "../tempJobsForm"
import {receiveMediaSearch} from '../mediaSearch'
import { batch } from 'react-redux'
import {setErrorState} from "../error_state";
import {receiveCapJobs} from "../existingVideoJobs";
import {addMediaFromCapJobs} from "../media";
import {v1 as uuidv1} from "uuid";

const server_url = serverURL();

function errorHandler(response, dispatch, error_id){

    if (!response.ok) {
        response.json()
            .then(data => dispatch(setErrorState(data['error']['message'], data['request_payload'], error_id)))
    }
    return response
}


function responseHandler(response, dispatch, reducer, unique_id, statusReducer) {

    if (response.ok) {
        response.json()
            .then(data => {reducer.forEach(

                cur_reducer => {
                    console.log("REEEEDUCER", reducer);
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
        let data_object = { 'requester_id': currentJob.job_info.requester_id,
            'show_date': currentJob.job_info.show_date,
            'media_id': currentJob.video.id,
            'output_format': currentJob.job_info.delivery_format,
            'comments': currentJob.job_info.comments}
        return {
            method: 'POST',
            body: JSON.stringify(data_object),
            headers: {
            'Content-Type': 'application/json'
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


    console.log("INPUTS", title, link, type, temp_id)
    let data_object = { title:title, source_url:link, media_type: type};

    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};

    console.log("POSTOBJ", post_object)
    return dispatch => {
        dispatch(LoadingMedia(true));
        return fetch(`${server_url}/media`, post_object)
            .then(response => response.json())
            .then(data => {dispatch(receiveMediaSearch(data['content'], temp_id),
                                    dispatch(addMediaToTempJob(temp_id, data['content'])))})
            .then(() => dispatch(LoadingMedia(false)))



    }

};

