import * as api from '../../utilities/api/api_access'
import {receiveCourses} from '../courses'
import {receiveInstructors} from '../instructors'
import receiveVideos from '../video_jobs'
import receiveStudents from '../students'
import receiveIlearnVideos from '../ilearn_videos'
import receiveMedia from '../media'
import {LoadingCourses, LoadingIlearnVideos, LoadingInstructors, LoadingMedia, LoadingStudents, LoadingVideoJobs} from '../status'

import fetch from "cross-fetch";


const server_url = 'http://127.0.0.1:5000/api/v1/captioning';


export function fetchAllCourses() {

    return dispatch => {

        dispatch(receiveCourses());
        dispatch(LoadingCourses(true))
        return fetch(`${server_url}/courses?semester=sp19`)
            .then(response => response.json())
            .then(data => dispatch(receiveCourses(data)))
            .then(() => dispatch(LoadingCourses(false)))
            .then(data => console.log(data))

    }


}

export function fetchCoursesbyInstructorId(instructor_id) {

    return dispatch => {

        dispatch(receiveCourses());
        return fetch(`${server_url}/courses?instructor_id=${instructor_id}`)
            .then(response => response.json())
            .then(data => dispatch(receiveCourses(data)))
            .then(data => console.log(data))

    }


}

export function fetchVideoJobsByInstructor(semester, instructor_id) {

    return dispatch => {

        dispatch(receiveVideos());
        return fetch(`${server_url}/video-jobs?semester=${semester}&instructor_id=${instructor_id}`)
            .then(response => response.json())
            .then(data => dispatch(receiveVideos(data)))
            .then(data => console.log(data))

    }


}


export function fetchStudent(student_id) {

    return dispatch => {

        dispatch(receiveStudents());
        return fetch(`${server_url}/students?student_id=${student_id}`)
            .then(response => response.json())
            .then(data => dispatch(receiveStudents(data)))
            .then(data => console.log(data))

    }


}

export function fetchAllStudents() {

    return dispatch => {

        dispatch(receiveStudents());
        return fetch(`${server_url}/students?captioning_active=true`)
            .then(response => response.json())
            .then(data => dispatch(receiveStudents(data)))
            .then(data => console.log(data))

    }


}


export function fetchInstructors(semester) {

    return dispatch => {

        dispatch(receiveInstructors());
        return fetch(`${server_url}/instructors?semester=${semester}`)
            .then(response => response.json())
            .then(data => dispatch(receiveInstructors(data)))
            .then(data => console.log(data))

    }

}


export function fetchIlearnVideosBySemester(semester) {

    return dispatch => {

        dispatch(receiveIlearnVideos());
        dispatch(LoadingIlearnVideos(true))

        return fetch(`${server_url}/ilearn-videos?semester=${semester}`)
            .then(response => response.json())
            .then(data => dispatch(receiveIlearnVideos(data)))
            .then(() => dispatch(LoadingIlearnVideos(false)))
            .then(data => console.log(data))

    }

}

export function fetchMediaById(id) {
    return dispatch => {

        dispatch(receiveMedia());

        return fetch(`${server_url}/media?id=${id}`)
            .then(response => response.json())
            .then(data => dispatch(receiveMedia(data)))
            .then(data => console.log(data))

    }



}



