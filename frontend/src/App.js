import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import ProjectList from './components/ProjectList';
import AddProject from './components/AddProject';
import Project from './components/Project';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/projects" className="navbar-brand">
            Deploy Dashboard
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/projects"} className="nav-link">
                Projects
              </Link>
            </li>
            <li>
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/projects"]} component={ProjectList} />
            <Route exact path="/add" component={AddProject} />
            <Route path="/projects/:id" component={Project} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
