import {writeCourse} from '../courses'
import {writeiLearnVideo} from '../ilearn_videos'
import {api_failure} from '../../utilities/api/errors'
import {serverURL} from '../../constants'
import { batch } from 'react-redux'
import {LoadingIlearnVideos} from '../status'
import fetch from "cross-fetch";


const server_url = serverURL();


function checkResponse(data) {

    if (data['content'] !== null) {
        return data['content']
    } else {
        console.log("ERRORRRRRRRRR", data['error'])
        // error stuff here

    }
}

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
                .then(data => {console.log("farts", data)})
                .catch(error => console.log(error))
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
                    .then(data => {console.log("farts", data)})
                    .catch(error => console.log(error))

            })




        })
        dispatch(LoadingIlearnVideos(false))
    }
}
