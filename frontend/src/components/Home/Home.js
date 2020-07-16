import React from "react";
import { deployPrefix } from "../../config";
import AuthService from "../../services/auth.service";
import { Link } from "react-router-dom";

const Home = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
        <header className="jumbotron">
            <h3>
                <strong>{currentUser.username}</strong>
            </h3>
        </header>
        <div className="btn btn-list">
            <Link to={`${deployPrefix}/projects`} className="btn btn-primary">
                    Projects
            </Link>
            <Link to={`${deployPrefix}/add`} className="btn btn-success">
                    AddProject
            </Link>
            <Link to={`${deployPrefix}/user`} className="btn btn-warning">
                    Users
            </Link>
            <Link to={`${deployPrefix}/variables`} className="btn btn-danger">
                Variables
            </Link>
        </div>
    </div>
  );
};

export default Home;