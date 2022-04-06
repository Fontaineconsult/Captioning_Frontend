import {WRITE_EMPLOYEES} from "./employees";

export const RECEIVE_STUDENTS = 'RECEIVE_STUDENTS';
export const UPDATE_STUDENTS = 'UPDATE_STUDENTS';
export const CLEAR_STUDENTS = 'CLEAR_STUDENTS';


export default function receiveStudents(students) {

    return {
        type: RECEIVE_STUDENTS,
        students


    }


}

export function updateStudents(students) {


    return {
        type: UPDATE_STUDENTS,
        students

    }

}

export function writeStudents(student_id, student_object) {
    return {
        type: WRITE_EMPLOYEES,
        student_object,
        student_id

    }

}


export function clearStudents() {

    return {
        type: CLEAR_STUDENTS
    }

}


