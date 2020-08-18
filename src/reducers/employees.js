import {RECEIVE_EMPLOYEES, UPDATE_EMPLOYESS, CLEAR_EMPLOYEES} from "../actions/employees";

export default function employeesReducer (state={}, action) {

    switch (action.type) {

        case RECEIVE_EMPLOYEES:
            return {
                ...state,
                ...action.employees
            };

        case UPDATE_EMPLOYESS:
            return {
                ...action.employees
            }

        case CLEAR_EMPLOYEES:
            return {}


        default:
            return state
    }

}