import {CLEAR_COURSES, RECEIVE_COURSES, UPDATE_COURSES, WRITE_COURSE} from '../actions/courses'
import {REPLACE_CAP_JOB_DATA} from "../actions/existingVideoJobs";



export default function coursesReducer (state={}, action) {

    switch (action.type) {


        case UPDATE_COURSES:

            return {
                ...state,
                ...action.data
            }


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