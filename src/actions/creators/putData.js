import fetch from "cross-fetch";

import {addCapJob, addCapJobMedia} from '../newCapJob'
import {api_failure} from "../../utilities/api/errors";
import {serverURL} from '../../constants'

const server_url = serverURL();



export function AddVideoJob(course_gen_id, title, link, type) {


    data_object = {'course_id': "fa18AAS35001",
        'request_date': null,
        'delivered_date': null,
        'media_id': 44,
        'output_format': null,
        'comments': null,
        'delivery_location': null,
        'transcripts_only': null,
        'job_status': null,
        'captioning_provider': null,
        'priority': null,
        'rush_service_used': null,
        'request_method': null,
        'ast_job_id': null}


    let data_object = { course_gen_id: course_gen_id};

    let post_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }}

    return dispatch => {

        dispatch(addCapJob(data_object));
        return fetch(`${server_url}/video-jobs`, post_object)
            .then(data => console.log(JSON.stringify(data.ok)))
            .catch(error => api_failure(error))


    }

};

export function AddMedia(title, link, type) {



    let data_object = { title:title, source_url:link, media_type: type};

    let post_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};

    return dispatch => {
        return fetch(`${server_url}/media`, post_object)
            .then(response => response.json())
            .then(data => dispatch(addCapJobMedia(data)))
            .catch(error => api_failure(error))


    }

};

