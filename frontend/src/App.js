import React, { useState, useEffect } from "react";
import { deployPrefix } from "./config";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
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
import Home from "./components/Home/Home";

function App() {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  let match = useRouteMatch();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      if(user.roles){ 
        setShowAdminBoard(user.roles.includes("ROLE_ADMIN")); 
      }
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href={currentUser ? `${deployPrefix}/projects` : `${deployPrefix}/home`} className="navbar-brand">
            Deploy Dashboard
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={`${deployPrefix}/home`} className="nav-link">
                Home
              </Link>
            </li>

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={`${deployPrefix}/admin`} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={`${deployPrefix}/projects`} className="nav-link">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link to={`${deployPrefix}/add`} className="nav-link">
                    AddProject
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`${deployPrefix}/user`} className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`${deployPrefix}/variables`} className="nav-link">
                    Variables
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={`${deployPrefix}/addvariable`} className="nav-link">
                    Add Variables
                  </Link>
                </li>
              </div>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={`${deployPrefix}/profile`} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href={`${deployPrefix}/login`} className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={`${deployPrefix}/login`} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={`${match.path}/register`} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}

        </nav>
        <div className="container mt-3">
          <Route exact path={`${deployPrefix}/login`} component={Login} />
          {currentUser && (
            <Switch>
              <Route exact path={[`${deployPrefix}/`, `${deployPrefix}/projects`]} component={ProjectList} />
              <Route exact path={`${deployPrefix}/variables`} component={VariableList} />
              <Route exact path={`${deployPrefix}/add`} component={AddProject} />
              <Route exact path={`${deployPrefix}/addvariable`} component={AddVariable} />
              <Route exact path={`${deployPrefix}/profile`} component={Profile} />
              <Route exact path={`${deployPrefix}/home`} component={Home} />
              <Route path={`${deployPrefix}/projects/:id`} component={Project} />
              <Route path={`${deployPrefix}/tasks/:id`} component={Task} />
              <Route path={`${deployPrefix}/variables/:id`} component={Variable} />

            </Switch>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
