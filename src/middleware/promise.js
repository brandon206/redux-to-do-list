export default (store)  => (next) => async (action) => {
    if(!action.payload || !action.payload.then ){
        //no payload property
        //not a promise
        return next(action);
    }

    //has a promise on the payload property

    const resp = await action.payload;

    const newAction = {
        ...action,
        payload: resp
    }

    store.dispatch(newAction);

    // action.payload.then((resp) => {
    //     const newAction = {
    //         ...action,
    //         payload: resp
    //     }
    //     store.dispatch(newAction);
    // });

    return action.payload;
}