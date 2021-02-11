export const addName = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_NAME',
            payload: {enteredData: data}
        })
    }
}

export const addNote = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'ADD_NOTE',
            payload: {enteredNote: data}
        })
    }
}