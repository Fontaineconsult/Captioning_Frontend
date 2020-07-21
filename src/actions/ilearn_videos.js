export const RECEIVE_ILEARN_VIDEOS = 'RECEIVE_ILEARN_VIDEOS';
export const UPDATE_ILEARN_VIDEO = 'UPDATE_ILEARN_VIDEO';
export const CLEAR_ILEARN_VIDEO = 'CLEAR_ILEARN_VIDEO';

export function receiveIlearnVideos(IlearnVideos) {

    return {
        type: RECEIVE_ILEARN_VIDEOS,
        IlearnVideos
    }
}

export function writeiLearnVideo(video_id, ilearn_video_object) {
    return {
        type: UPDATE_ILEARN_VIDEO,
        ilearn_video_object,
        video_id

    }

}

export function clearIlearnVideo() {

    return {
        type: CLEAR_ILEARN_VIDEO

    }

}