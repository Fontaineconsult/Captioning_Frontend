import {RECEIVE_CAMPUS_ORGS} from "../actions/campusOrgs";

export default function campusOrgReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_CAMPUS_ORGS:
            return {
                ...state,
                ...action.campus_orgs


            };


        default:
            return state
    }



}