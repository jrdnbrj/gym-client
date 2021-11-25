const initialState = {
    token: null,
}

type Action = {
    type: string,
    payload?: string,
}

const authReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload,
            }
        default:
            return state;
    }
}

export default authReducer
