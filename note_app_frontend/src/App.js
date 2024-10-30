import './App.css';
import Notes from "./components/Notes";
import Header from "./Header";
import * as PropTypes from "prop-types";
import Login from "./components/Login";

import React from 'react';
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
  const isAuthenticated = !!localStorage.getItem('access_token');

  return (
    <div className="App">
      <Header/>
      <Router>

        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route
            path="/notes"
            element={isAuthenticated ? <Notes/> : <Navigate to="/login"/>}
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/notes" : "/login"}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
