export const RECEIVE_COURSES = 'RECEIVE_COURSES';
export const WRITE_COURSE = 'WRITE_COURSE';

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
