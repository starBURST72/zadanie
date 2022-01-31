import React from 'react';
import './App.css';
import { store } from "./actions/store";
import { Provider } from "react-redux";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import TRegs from './components/TRegs';
import TQuestions from './components/TQuestions';
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Navbar/Sidebar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from './Navbar/AppRouter';

function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
      <BrowserRouter>
        <Container maxWidth="lg">
          <Navbar/>
          <Sidebar/>
          <AppRouter/>
        </Container>
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  );
}

export default App;
