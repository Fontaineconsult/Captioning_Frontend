import {CLEAR_COURSES, RECEIVE_COURSES, WRITE_COURSE} from '../actions/courses'



export default function coursesReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_COURSES:
            return {
                ...state,
                ...action.courses
            };

        case WRITE_COURSE:
            return {
                ...state,
                [action.course_data.course_gen_id] : {
                    ...state[action.course_data.course_gen_id],
                    [action.column]:[action.value]
                }

            };

        case CLEAR_COURSES:
            return { }


        default:
            return state
    }



}