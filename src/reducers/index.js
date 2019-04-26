import { combineReducers } from 'redux'
import coursesReducer from './courses'
import instructorsReducer from './instructors'
import studentsReducer from './students'
import videosJobsReducer from './video_jobs'
import iLearnVideoReducer from './ilearn_videos'

export default combineReducers({

    coursesReducer,
    instructorsReducer,
    studentsReducer,
    videosJobsReducer,
    iLearnVideoReducer

})