export const RECEIVE_VIDEO_JOBS = 'RECEIVE_VIDEO_JOBS';


export default function receiveVideos(videos) {

    return {
        type: RECEIVE_VIDEO_JOBS,
        videos

    }


}
