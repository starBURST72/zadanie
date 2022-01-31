import { combineReducers } from "redux";
import { tReg } from "./tReg";
import { tQuestions } from "./tQuestions";
import { sidebar } from "./sidebar";
import { tAnswer } from "./tAnswer";
export const reducers = combineReducers({
    tReg,
    tQuestions,
    tAnswer,
    sidebar:sidebar
})