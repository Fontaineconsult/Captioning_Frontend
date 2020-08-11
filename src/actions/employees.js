export const RECEIVE_EMPLOYEES = 'RECEIVE_EMPLOYEES';
export const WRITE_INSTRUCTORS = 'WRITE_INSTRUCTORS';
export const UPDATE_EMPLOYESS = 'UPDATE_EMPLOYESS';

export function receiveEmployees(employees) {

    return {
        type: RECEIVE_EMPLOYEES,
        employees

    }

}


export function updateEmployees(employees) {


    return {
        type: UPDATE_EMPLOYESS,
        employees

    }

}



export function writeInstructors(instructor_data) {



    return {
        type: WRITE_INSTRUCTORS,
        instructor_data

    }

}