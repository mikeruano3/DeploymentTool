import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from "./services/auth.service";
import Login from "./components/User/Login";
import Profile from "./components/User/Profile";

import ProjectList from './components/Project/ProjectList';
import AddProject from './components/Project/AddProject';
import Project from './components/Project/Project';
import Task from "./components/Task/Task";
import VariableList from "./components/Variables/VariableList";
import Variable from "./components/Variables/Variable";
import AddVariable from "./components/Variables/AddVariable";

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href={currentUser ? "/projects" : "/home"} className="navbar-brand">
            Deploy Dashboard
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/projects"} className="nav-link">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to={"/add"} className="nav-link">
                    AddProject
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/variables"} className="nav-link">
                    Variables
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/addvariable"} className="nav-link">
                    Add Variables
                  </Link>
                </li>
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}

        </nav>
        <div className="container mt-3">
          <Route exact path="/login" component={Login} />
          {currentUser && (
            <Switch>
              <Route exact path={["/", "/projects"]} component={ProjectList} />
              <Route exact path="/variables" component={VariableList} />
              <Route exact path="/add" component={AddProject} />
              <Route exact path="/addvariable" component={AddVariable} />
              <Route path="/projects/:id" component={Project} />
              <Route path="/tasks/:id" component={Task} />
              <Route path="/variables/:id" component={Variable} />
              <Route exact path="/profile" component={Profile} />

            </Switch>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
