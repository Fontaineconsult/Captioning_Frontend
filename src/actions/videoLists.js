export const RECEIVE_VIDEO_LIST = 'RECEIVE_VIDEO_LIST';
export const EMPTY_VIDEO_LIST = 'EMPTY_VIDEO_LIST';


export function receiveVideoList(video_list) {

    return {
        type: RECEIVE_VIDEO_LIST,
        video_list


    }


}

export function emptyVideoList() {

    return {
        type: EMPTY_VIDEO_LIST,

    }


}
