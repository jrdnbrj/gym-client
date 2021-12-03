const initialState = {
    user: {
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        clientID: undefined,
        instructorID: undefined,
    }
}

type Action = {
    type: string,
    payload?: string,
}

const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            }
        case "CLEAR_USER":
            return {
                ...state,
                user: initialState.user,
            }
        default:
            return state;
    }
}

export default userReducer
