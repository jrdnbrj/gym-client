const initialState = {
    user: {
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        isClient: false,
        isInstructor: false,
        isAdmin: false,
    },
    currentRole: "client",
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
        case "SET_CURRENT_ROLE":
            return {
                ...state,
                currentRole: action.payload,
            }
        case "CLEAR_CURRENT_ROLE":
            return {
                ...state,
                currentRole: initialState.currentRole,
            }
        default:
            return state;
    }
}

export default userReducer
