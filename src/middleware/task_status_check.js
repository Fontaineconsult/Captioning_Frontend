const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
    return {
        type: INCREMENT_COUNTER
    };
}

function asyncStatusCheck() {
    return dispatch => {
        setInterval(() => {
            // Yay! Can invoke sync or async actions with `dispatch`
            console.log("YOUZAS")
            // dispatch(increment());
        }, 2000);
    };
}
export default asyncStatusCheck