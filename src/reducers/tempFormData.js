import {
    ADD_TEMP_FORM_VALUE,
    CLEAR_FORM_DATA,
    UPDATE_BTN_CLICKED_IN_TEMP_FORM_VALUE,
    UPDATE_SINGLE_SOURCE_LOCATION,
    UPDATE_SINGLE_VIDEO_TITLE,
    UPDATE_SINGLE_VIDEO_TYPE
} from "../actions/tempFormData";

export default function tempFormDataReducer(state = {}, action) {
    switch (action.type) {
        //initialising everything to default
        case ADD_TEMP_FORM_VALUE:
            return {
                ...state,
                "data": {
                    formValue: action.formValue,
                    btn_clicked: null,
                    single_video_type: 'URL',
                    single_source_location: null,
                    single_video_title: null,


                }
            }

        //only btn gets updated here
        case UPDATE_BTN_CLICKED_IN_TEMP_FORM_VALUE:
            return {
                ...state,
                "data": {
                    formValue: {...state["data"].formValue},
                    btn_clicked: action.btn_clicked,
                    single_video_type: state["data"].single_video_type,
                    single_source_location: state["data"].single_source_location,
                    single_video_title: state["data"].single_video_title,
                }
            }


        case UPDATE_SINGLE_VIDEO_TYPE:
            return {
                ...state,
                "data": {
                    formValue: {...state["data"].formValue},
                    btn_clicked: state["data"].btn_clicked,
                    single_video_type: action.video_type,
                    single_source_location: state["data"].single_source_location,
                    single_video_title: state["data"].single_video_title,
                }
            }

        case UPDATE_SINGLE_SOURCE_LOCATION:
            return {
                ...state,
                "data": {
                    formValue: state["data"].formValue,
                    btn_clicked: state["data"].btn_clicked,
                    single_video_type: state["data"].single_video_type,
                    single_source_location: action.source_location,
                    single_video_title: state["data"].single_video_title,
                }
            }

        case UPDATE_SINGLE_VIDEO_TITLE:
            return {
                ...state,
                "data": {
                    formValue: state["data"].formValue,
                    btn_clicked: state["data"].btn_clicked,
                    single_video_type: state["data"].single_video_type,
                    single_source_location: state["data"].single_source_location,
                    single_video_title: action.video_title,
                }
            }

        case CLEAR_FORM_DATA:
            return {}


        default:
            return state

    }

}