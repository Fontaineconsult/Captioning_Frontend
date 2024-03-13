import { ADD_CAP_JOB, ADD_CAP_JOB_MEDIA } from "../actions/newCapJob";
import { JOB_SUBMISSION_COMPLETED } from "../actions/asyncActions"; // Check if  you have an action type for job submission completion

export default function newCapJobReducer(state = {}, action) {
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
        case JOB_SUBMISSION_COMPLETED:
            // Reset the submission status when job submission is completed
            return {
                ...state,
                isSubmitted: false
            };
        default:
            return state;
    }
}
