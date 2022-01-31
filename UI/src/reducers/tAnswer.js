import { ACTION_TYPES } from "../actions/tAnswer";
const initialState = {
    list: [],
    loading: true
}


export const tAnswer = (state = initialState, action) => {

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
                list: state.list.map(x => x.answersId === action.payload.answersId ? action.payload : x)
            }

        case ACTION_TYPES.DELETE:
            return {
                ...state,
                list: state.list.filter(x => x.answersId !== action.payload)
            }

        default:
            return state
    }
}