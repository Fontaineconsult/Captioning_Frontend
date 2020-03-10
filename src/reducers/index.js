import { combineReducers } from 'redux'
import coursesReducer from './courses'
import instructorsReducer from './instructors'
import studentsReducer from './students'
import videosJobsReducer from './video_jobs'
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
import mediaSearchReducer from "./currentVideoSearch";

export default combineReducers({

    coursesReducer,
    instructorsReducer,
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
    mediaSearchReducer

})