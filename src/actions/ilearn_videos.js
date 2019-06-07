export const RECEIVE_ILEARN_VIDEOS = 'RECEIVE_ILEARN_VIDEOS';
export const UPDATE_ILEARN_VIDEO = 'UPDATE_ILEARN_VIDEO';

export function receiveIlearnVideos(IlearnVideos) {

    return {
        type: RECEIVE_ILEARN_VIDEOS,
        IlearnVideos

    }


}

export function writeiLearnVideo(course_gen_id, ilearn_video_object) {

    console.log("DERP", course_gen_id, ilearn_video_object)

    return {
        type: UPDATE_ILEARN_VIDEO,
        ilearn_video_object,
        course_gen_id

    }

}