import {RECEIVE_EMPLOYEES} from "../actions/employees";

export default function employeesReducer (state={}, action) {

    switch (action.type) {

        case RECEIVE_EMPLOYEES:
            return {
                ...state,
                ...action.employees
            };

        default:
            return state
    }

}