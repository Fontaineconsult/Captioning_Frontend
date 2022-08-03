export const RECEIVE_CANVAS_VIDEOS = 'RECEIVE_CANVAS_VIDEOS';
export const UPDATE_CANVAS_VIDEO = 'UPDATE_CANVAS_VIDEO';
export const CLEAR_CANVAS_VIDEO = 'CLEAR_CANVAS_VIDEO';

export function receiveCanvasVideos(canvasVideos) {

    return {
        type: RECEIVE_CANVAS_VIDEOS,
        canvasVideos
    }
}

export function writeCanvasVideo(video_id, canvas_video_object) {
    return {
        type: UPDATE_CANVAS_VIDEO,
        canvas_video_object,
        video_id

    }

}

export function clearCanvasVideo() {

    return {
        type: CLEAR_CANVAS_VIDEO

    }

}