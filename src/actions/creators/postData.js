import {writeCourse} from '../courses'
import {writeiLearnVideo} from '../ilearn_videos'
import {api_failure} from '../../utilities/api/errors'


import fetch from "cross-fetch";


const server_url = 'http://127.0.0.1:5000/api/v1/captioning';


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
        console.log(post_object)

        dispatch(writeiLearnVideo(course_gen_id, data_object));

        return fetch(`${server_url}/ilearn-videos`, post_object)
                .then(data => console.log(JSON.stringify(data.response)))
                .catch(error => api_failure(error))
    }
}