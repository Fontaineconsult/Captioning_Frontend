export const RECEIVE_MEDIA = 'RECEIVE_MEDIA';


export default function receiveMedia(media) {

    return {
        type: RECEIVE_MEDIA,
        media
    }


}


