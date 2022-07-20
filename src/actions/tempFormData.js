export const ADD_TEMP_FORM_VALUE = "ADD_TEMP_FORM_VALUE";
export const UPDATE_BTN_CLICKED_IN_TEMP_FORM_VALUE = "UPDATE_BTN_CLICKED_IN_TEMP_FORM_VALUE";
export const UPDATE_SINGLE_VIDEO_TYPE = "UPDATE_SINGLE_VIDEO_TYPE";
export const UPDATE_SINGLE_SOURCE_LOCATION = "UPDATE_SINGLE_SOURCE_LOCATION";
export const UPDATE_SINGLE_VIDEO_TITLE = "UPDATE_SINGLE_VIDEO_TITLE"
export const CLEAR_FORM_DATA = "CLEAR_FORM_DATA";

export function addTempFormValue(formValue) {
    return {
        type: ADD_TEMP_FORM_VALUE,
        formValue,

    }
}

export function updateBtnClickedInTempFormValue(btn_clicked) {
    return {
        type: UPDATE_BTN_CLICKED_IN_TEMP_FORM_VALUE,
        btn_clicked

    }
}

export function updateSingleVideoType(video_type) {
    return {
        type: UPDATE_SINGLE_VIDEO_TYPE,
        video_type

    }
}

export function updateSingleSourceLocation(source_location) {
    return {
        type: UPDATE_SINGLE_SOURCE_LOCATION,
        source_location

    }
}

export function updateSingleVideoTitle(video_title) {
    return {
        type: UPDATE_SINGLE_VIDEO_TITLE,
        video_title

    }
}

export function clearFormData() {
    return {
        type: CLEAR_FORM_DATA,


    }
}

