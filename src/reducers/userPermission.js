import {RECEIVE_USER_PERMISSIONS} from "../actions/userPermission";

export default function userPermissionReducer (state={}, action) {

    switch (action.type) {


        case RECEIVE_USER_PERMISSIONS:
            return {
                ...state,
                ...action.userPermission

            };


        default:
            return state
    }



}