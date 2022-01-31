import TAnswers from './components/TAnswers';
import TQuestions from './components/TQuestions';
import TRegs from "./components/TRegs";
import TTest from './components/TTest';

export const publicRoutes=[
    {path: '/Reg',component: TRegs, exact:true},
    {path: '/Questions',component:TQuestions, exact:true},
    {path: '/Answers',component: TAnswers, exact:true},
    {path: '/Test',component: TTest, exact:true}
]