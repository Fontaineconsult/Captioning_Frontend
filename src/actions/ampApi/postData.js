import fetch from "cross-fetch";

import {addCapJob, addCapJobMedia} from '../newCapJob'
import {addMedia} from '../media'
import {api_failure} from "../../utilities/api/errors";
import {serverURL} from '../../constants'
import {LoadingIlearnVideos,LoadingMedia, LoadingVideoJobs} from "../status";
import {addMediaToTempJob} from "../tempJobsForm"


const server_url = serverURL();



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

export function AddMediaToJob(title, link, type, temp_id) {


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
            .then(data => dispatch(addMediaToTempJob(temp_id, data['content'])))
            .then(() => dispatch(LoadingMedia(false)))
            .catch(error => api_failure(error))


    }

};

