import {writeCourse} from '../courses'
import {writeiLearnVideo} from '../ilearn_videos'
import {api_failure} from '../../utilities/api/errors'
import {serverURL} from '../../constants'

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

    return dispatch => {
        dispatch(writeiLearnVideo(video_id, data_object));

        return fetch(`${server_url}/ilearn-videos`, put_object)
                .then(response => response.json())
                .then(data => {console.log("farts", data)})
                .catch(error => console.log(error))

    }
}