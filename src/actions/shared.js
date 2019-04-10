import * as api from '../utilities/api/api_access'
import * as course_reducers from './courses'
import fetch from "cross-fetch";


export function fetchAllCourses() {

    return dispatch => {

        dispatch(course_reducers.receiveCourses());
        return fetch(`http://127.0.0.1:5000/api/v1/captioning/courses?semester=sp19`)
            .then(response => response.json())
            .then(data => dispatch(course_reducers.receiveCourses(data)))
            .then(data => console.log(data))




    }


}


export function fetchCoursesbyInstructorId(instructor_id) {

    return dispatch => {

        dispatch(course_reducers.receiveCourses());
        return fetch(`http://127.0.0.1:5000/api/v1/captioning/courses?instructor_id=${instructor_id}`)
            .then(response => response.json())
            .then(data => dispatch(course_reducers.receiveCourses(data)))
            .then(data => console.log(data))


    }


}




export function fetchAllVideos() {

    return dispatch => {

        dispatch(course_reducers.receiveCourses());
        return fetch(`http://127.0.0.1:5000/api/v1/captioning/courses?semester=sp19`)
            .then(response => response.json())
            .then(data => dispatch(course_reducers.receiveCourses(data)))
            .then(data => console.log(data))




    }


}