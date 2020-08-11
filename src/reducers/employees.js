import {RECEIVE_EMPLOYEES, UPDATE_EMPLOYESS} from "../actions/employees";

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



        default:
            return state
    }

}