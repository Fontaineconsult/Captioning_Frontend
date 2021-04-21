import {writeCourse, replaceCourseData} from '../courses'
import {updateMediaDeep} from '../media'
import {writeiLearnVideo} from '../ilearn_videos'
import {api_failure} from '../../utilities/api/errors'
import {endpoint} from '../../constants'
import { batch } from 'react-redux'
import {updateCapJob, deleteCapJob, addNewAstJob, replaceCapJobData} from '../existingVideoJobs'
import {LoadingIlearnVideos, LoadingVideoJobs, LoadingAstJob, LoadingCourses} from '../status'
import {initASTJob} from '../existingVideoJobs'
import fetch from "cross-fetch";
import clipboardCopy from "clipboard-copy";
import {v1 as uuidv1} from "uuid";

const server_url = endpoint();


function checkResponse(data) {

    if (data['content'] !== null) {
        return data['content']
    } else {
        console.log("ERRORRRRRRRRR", data['error'])
        // error stuff here

    }
}



export function updateMedia(media_id, column, value) {

    let data_object = { id: media_id, column: column, value: value };

    let put_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return dispatch => {

        dispatch(updateMediaDeep(data_object));
        return fetch(`${server_url}/media`, put_object)
            .then(data => console.log(JSON.stringify(data.response)))
            .catch(error => api_failure(error))
    }}




export function updateCourse(course_gen_id, column, value) {

    let data_object = { course_gen_id: course_gen_id, column: column, value: value };

    let put_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return dispatch => {

        dispatch(writeCourse(data_object));
        return fetch(`${server_url}/courses`, put_object)
            .then(data => console.log(JSON.stringify(data.response)))
            .catch(error => api_failure(error))
    }}


export function updateiLearnVideo(video_id, column, value) {

    let data_object = {id: video_id, column: column, value: value };

    let put_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return (dispatch, getState) => {
        dispatch(writeiLearnVideo(video_id, data_object));
        return fetch(`${server_url}/ilearn-videos`, put_object)
                .then(response => response.json())
                .catch(error => console.log(error))
    }
}


export function updateVideoJob(job_id, column, value){

    let data_object = {id: job_id, column: column, value: value };

    let put_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }

    };
    return (dispatch, getState) => {
        return fetch(`${server_url}/video-jobs`, put_object)
            .then(response => response.json())
            .then(data => dispatch(updateCapJob(job_id, column, value)))
            .catch(error => console.log(error))
    }
}

export function deleteVideoJob(job_id, column, value){

    let data_object = {id: job_id, column: column, value: value };

    let put_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }

    };

    return (dispatch, getState) => {
        dispatch(LoadingVideoJobs(true))
        return fetch(`${server_url}/video-jobs`, put_object)
            .then(response => response.json())
            .then(data => dispatch(deleteCapJob(job_id)))
            .then(data => dispatch(LoadingVideoJobs(false)))
            .catch(error => console.log(error))
    }
}



export function getS3Link(file_id){

    let data_object = {file_id: file_id};

    let put_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }

    };

    function clipBoard(data){
        clipboardCopy(data).then(function (){
            alert("Copied to Clipboard")

        })

    }
    return (dispatch) => {
        dispatch(LoadingVideoJobs(true))
        return fetch(`${server_url}/services/make-public`, put_object)
            .then(response => response.text())
            .then(data => clipBoard(data))
            .then(data => dispatch(LoadingVideoJobs(false)))
            .catch(error => alert(error))
    }
}





export function updateiLearnVideoBatch(video_ids, column, value) {
    let data_objects = video_ids.map(id => {
        return {
            request_payload: {
                method: 'PUT',
                body: JSON.stringify({id: id, column: column, value: value }),
                headers: {
                    'Content-Type': 'application/json'}},
            dispatch_payload: {id: id, column: column, value: value }
        };
    });


    return (dispatch, getState) => {
        dispatch(LoadingIlearnVideos(true))
        batch(() => {
            data_objects.forEach(object => {
                console.log(object)
                dispatch(writeiLearnVideo(object.dispatch_payload.id, object.dispatch_payload));
                return fetch(`${server_url}/ilearn-videos`, object.request_payload)
                    .then(response => response.json())
                    .catch(error => console.log(error))
            })
        })
        dispatch(LoadingIlearnVideos(false))
    }
}

export function submitASTJobToAST(ast_job_id, job_id, file_id) {
    console.log(ast_job_id)
    let data_object = {"ast-job-id": ast_job_id, "file_id": file_id};

    let put_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }}

    return (dispatch) => {
        dispatch(LoadingAstJob(true))
        return fetch(`${server_url}/ast-jobs`, put_object)
            .then(response => response.json())
            .then(data => dispatch(initASTJob(data['content']['echo'], ast_job_id, job_id)))
            .then(data => dispatch(LoadingAstJob(false)))
            .catch(error => console.log(error))
        }


}

export function sendEmailCommandJobs(requester_id, template, params) {

    let error_id = uuidv1()
    let data_object = { template:template, params: params};

    let put_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};
    return (dispatch, getState) => {
        dispatch(LoadingVideoJobs(true))
        return fetch(`${server_url}/services/email`, put_object)
            .then(response => {if (response.ok){
                return fetch(`${server_url}/video-jobs?requester_id=${requester_id}`)
                    .then(response => response.json())
                    .then(data => dispatch(replaceCapJobData(data['content'])))
                    .then(dispatch(LoadingVideoJobs(false)))

            }})


}




}


export function sendEmailCommandCourses(requester_id, template, params) {

    let error_id = uuidv1()
    let data_object = { template:template, params: params};

    let put_object = {
        method: 'PUT',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }};
    return (dispatch, getState) => {
        dispatch(LoadingCourses(true))
        return fetch(`${server_url}/services/email`, put_object)
            .then(response => {if (response.ok){
                return fetch(`${server_url}/courses?requester_id=${requester_id}`)
                    .then(response => response.json())
                    .then(data => dispatch(replaceCourseData(data['content'])))
                    .then(dispatch(LoadingCourses(false)))

            }})


    }




}
