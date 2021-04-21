import {RECEIVE_VIDEO_JOBS,
    UPDATE_VIDEO_JOBS,
    ADD_NEW_AST_JOB,
    ADD_AST_ID_TO_AST_JOB,
    DELETE_CAP_JOB,
    CLEAR_CAP_JOBS,
    REPLACE_CAP_JOB_DATA} from "../actions/existingVideoJobs";

export default function videosJobsReducer (state={}, action) {

    switch (action.type) {

        case REPLACE_CAP_JOB_DATA:


            return {

                ...state,
                ...action.data
            }


        case RECEIVE_VIDEO_JOBS:
            return {
                ...state,
                ...action.videos
            };

        case UPDATE_VIDEO_JOBS: {
            //job_id, column, value

            return {
                ...state,
                [action.job_id]:  {...state[action.job_id], [action.column]: action.value
                }
            }
        }

        case ADD_NEW_AST_JOB: {

            return {
                ...state,
                [action.job_id]: {...state[action.job_id], ast_jobs:
                        [ ...state[action.job_id].ast_jobs, action.astJob]
                }
            }
        }

        case DELETE_CAP_JOB: {

            return Object.keys(state).reduce((accumulator, element) => {
                if (element !== action.job_id) {
                    accumulator[element] = state[element]
                }
                return accumulator
            }, {});


        }

        case ADD_AST_ID_TO_AST_JOB: {

            let exitingId = state[action.job_id].ast_jobs.findIndex(element => {
                return element.id === action.ast_job_id
            })

            let new_job = state[action.job_id].ast_jobs[exitingId]

            new_job.ast_id = action.unique_ast_job_id
            new_job.captioning_status = "submitted"

            let new_jobs = [...state[action.job_id].ast_jobs]

            new_jobs[exitingId] = new_job

            return {
                ...state,
                [action.job_id]: {...state[action.job_id],

                    ast_jobs: [...new_jobs] }
            }

        }

        case CLEAR_CAP_JOBS: {
            return { }

        }


        default:
            return state
    }



}