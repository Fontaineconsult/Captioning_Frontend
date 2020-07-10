import {RECEIVE_VIDEO_JOBS, UPDATE_VIDEO_JOBS, ADD_NEW_AST_JOB, ADD_AST_ID_TO_AST_JOB, DELETE_CAP_JOB} from "../actions/existingVideoJobs";

export default function videosJobsReducer (state={}, action) {

    switch (action.type) {


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
            console.log("DELETE")

            return Object.keys(state).reduce((accumulator, element) => {
                if (element !== action.job_id) {
                    console.log(element, action.job_id)
                    accumulator[element] = state[element]
                }
                return accumulator
            }, {});


        }

        case ADD_AST_ID_TO_AST_JOB: {

            let index = state[action.job_id].ast_jobs.findIndex(element => {
                return element.id === action.ast_job_id
            })
            let new_job = state[action.job_id].ast_jobs[index]
            new_job.ast_id = action.unique_ast_job_id

            let new_jobs = [...state[action.job_id].ast_jobs]
            new_jobs[index] = new_job
            return {
                ...state,
                [action.job_id]: {...state[action.job_id],

                    ast_jobs: [...new_jobs] }
            }

        }




        default:
            return state
    }



}