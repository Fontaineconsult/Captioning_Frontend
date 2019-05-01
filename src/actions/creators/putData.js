import fetch from "cross-fetch";
import {writeCourse} from "../courses";
import {api_failure} from "../../utilities/api/errors";


const server_url = 'http://127.0.0.1:5000/api/v1/captioning';


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

        dispatch(writeCourse(data_object));
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
        }}

    return dispatch => {

        dispatch(writeCourse(data_object));
        return fetch(`${server_url}/media`, post_object)
            .then(data => console.log(JSON.stringify(data.ok)))
            .catch(error => api_failure(error))


    }

};
