import {writeCourse} from '../courses'
import {writeiLearnVideo} from '../ilearn_videos'
import {api_failure} from '../../utilities/api/errors'
import {serverURL} from '../../constants'

import fetch from "cross-fetch";


const server_url = serverURL();



export function updateCourse(course_gen_id, column, value) {

    let data_object = { course_gen_id: course_gen_id, column: column, value: value };

    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }

    };

    return dispatch => {

        dispatch(writeCourse(data_object));
        return fetch(`${server_url}/courses`, post_object)
            .then(data => console.log(JSON.stringify(data.response)))
            .catch(error => api_failure(error))


    }}



export function updateiLearnVideo(course_gen_id, video_id, column, value) {

    let data_object = {id: video_id, column: column, value: value };

    let post_object = {
        method: 'POST',
        body: JSON.stringify(data_object),
        headers: {
            'Content-Type': 'application/json'
        }

    };

    return dispatch => {
        console.log("postOBJECT", post_object)

        dispatch(writeiLearnVideo(course_gen_id, data_object));

        return fetch(`${server_url}/ilearn-videos`, post_object)
                .then(data => console.log(JSON.stringify(data.response)))
                .catch(error => api_failure(error))
    }
}