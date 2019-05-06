import {ADD_CAP_JOB, ADD_CAP_JOB_MEDIA} from "../actions/newCapJob";

export default function newCapJobReducer (state={}, action) {

    switch (action.type) {


        case ADD_CAP_JOB_MEDIA:
            return {
                ...state,
                ...action.media


            };

        case ADD_CAP_JOB:
            return {
                ...state,
                ...action.job


            };


        default:
            return state
    }



}