import './App.css';
import Notes from "./components/Notes";
import Header from "./Header";
import * as PropTypes from "prop-types";
import Login from "./components/Login";

import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

function RouteProps(props){
  return null;
}

RouteProps.propTypes = {children: PropTypes.node};

function RouteComponent(props){
  return null;
}

RouteComponent.propTypes = {
  path: PropTypes.string,
  element: PropTypes.element
};

function App(){
  const isAuthenticated = !!localStorage.getItem('accessToken');

  return (
    <div className="App">
      <Router>
        {isAuthenticated? <Header/> : ""}


        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to={"/notes"}/> : <Login />}/>
          <Route path="/notes" element={<Notes/>}/>
          <Route path="*" element={isAuthenticated ? <Navigate to={"/notes"}/> : <Navigate to={"/"}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
