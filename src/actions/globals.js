import {currentSemester} from "../constants"
export const SET_GLOBAL_PARAMS = 'SET_GLOBAL_PARAMS';
export const UPDATE_GLOBAL_PARAM = 'SET_GLOBAL_PARAM';


const globals = {
    currentSemester: currentSemester()

}



export function setGlobalParams() {

    return {
        type: SET_GLOBAL_PARAMS,
        globals
    }
}

export function updateGlobalParam(param, value){

    return {
        type: UPDATE_GLOBAL_PARAM,
        param,
        value

    }


}