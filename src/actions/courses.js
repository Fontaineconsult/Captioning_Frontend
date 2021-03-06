import {REPLACE_CAP_JOB_DATA} from "./existingVideoJobs";

export const RECEIVE_COURSES = 'RECEIVE_COURSES';
export const WRITE_COURSE = 'WRITE_COURSE';
export const CLEAR_COURSES = 'CLEAR_COURSES'
export const UPDATE_COURSES = 'UPDATE_COURSES'

export function receiveCourses(courses) {

    return {
        type: RECEIVE_COURSES,
        courses

    }


}


export function writeCourse(course_data) {

    return {
        type: WRITE_COURSE,
        course_data

    }


}


export function clearCourses() {

    return {
        type: CLEAR_COURSES
    }

}


export function replaceCourseData(data) {


    return {
        type: UPDATE_COURSES,
        data

    }
}
