import { ACTION_TYPES } from "../actions/tQuestion";
const initialState = {
    list: [],
    Qloading: true
}


export const tQuestions = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload],
                Qloading: false
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.qId === action.payload.qId ? action.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.qId !== action.payload)
            }

        default:
            return state
    }
}