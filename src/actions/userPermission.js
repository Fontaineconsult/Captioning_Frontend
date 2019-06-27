export const RECEIVE_USER_PERMISSIONS = 'RECEIVE_USER_PERMISSIONS';


export default function receiveUserPermissions(userPermission) {

    return {
        type: RECEIVE_USER_PERMISSIONS,
        userPermission


    }


}
