import {ADD_TEMP_CAP_JOB, ADD_MEDIA_TO_TEMP_JOB, ADD_JOB_INFO_TO_TEMP_JOB} from "../actions/tempJobsForm";


export default function tempJobsFormReducer (state={}, action) {

    switch (action.type) {

        case ADD_TEMP_CAP_JOB:
            return {
                ...state,
                [action.temp_id]: {video:{}, job_info:{}}

            };

        case ADD_MEDIA_TO_TEMP_JOB:
            let key = Object.keys(action.media_info);
            return {
                ...state,
                [action.temp_id]: {video: action.media_info[key], job_info: {...state[action.temp_id].job_info}}
            };

        case ADD_JOB_INFO_TO_TEMP_JOB:

            return {
                ...state,
                [action.temp_id]: {video: {...state[action.temp_id].video}, job_info: action.job_info}

            };
        default:
            return state
    }

}