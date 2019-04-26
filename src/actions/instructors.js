export const RECEIVE_INSTRUCTORS = 'RECEIVE_INSTRUCTORS';
export const WRITE_INSTRUCTORS = 'WRITE_INSTRUCTORS';

export function receiveInstructors(instructors) {

    return {
        type: RECEIVE_INSTRUCTORS,
        instructors

    }

}


export function writeInstructors(instructor_data) {



    return {
        type: WRITE_INSTRUCTORS,
        instructor_data

    }

}