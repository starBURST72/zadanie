import { ACTION_TYPES } from "../actions/tReg";
const initialState = {
    list: [],
    loading: true
}


export const tReg = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL:
            return {
                ...state,
                list: [...action.payload],
                loading: false
            }

        case ACTION_TYPES.CREATE:
            return {
                ...state,
                list: [...state.list, action.payload],
                loading: false
            }

        case ACTION_TYPES.UPDATE:
            return {
                ...state,
                list: state.list.map(x => x.regId === action.payload.id ? action.payload : x),
                loading: false
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.id !== action.payload),
                loading: false
            }

        default:
            return state
    }
}