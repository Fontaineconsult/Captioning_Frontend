import {combineReducers} from 'redux'
import coursesReducer from './courses'
import employeesReducer from './employees'
import studentsReducer from './students'
import videosJobsReducer from './existingVideoJobs'
import iLearnVideoReducer from './ilearn_videos'
import mediaReducer from './media'
import loadingStatusReducer from './status'
import newCapJobReducer from './newCapJob'
import requesterReducer from './requester'
import campusOrgReducer from './campusOrgs'
import userPermissionReducer from './userPermission'
import errorsReducer from './error_states'
import requestsReducer from './requests'
import tempJobsFormReducer from "./tempJobsForm";
import mediaSearchReducer from "./currentMediaSearch";
import globalsReducer from "./globals";
import asyncTaskIdReducer from "./asyncTaskIds"
import asyncStatusReducer from "./asyncTaskStatus"
import videoListsReducer from "./videoLists";
import tempFormDataReducer from "./tempFormData";
import canvasVideoReducer from "./canvas_videos";
import searchFilter from "./searchFilter";

export default combineReducers({

    coursesReducer,
    employeesReducer,
    studentsReducer,
    videosJobsReducer,
    iLearnVideoReducer,
    mediaReducer,
    loadingStatusReducer,
    newCapJobReducer,
    requesterReducer,
    campusOrgReducer,
    userPermissionReducer,
    errorsReducer,
    requestsReducer,
    tempJobsFormReducer,
    tempFormDataReducer,
    mediaSearchReducer,
    globalsReducer,
    asyncTaskIdReducer,
    asyncStatusReducer,
    videoListsReducer,
    canvasVideoReducer,
    searchFilterReducer: searchFilter


})