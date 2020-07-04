import React, { useState, useEffect } from "react";
import ProjectsDataService from "../services/ProjectsDataService";
import { Link } from "react-router-dom";

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveProjects();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveProjects = () => {
        ProjectsDataService.getAll()
          .then(response => {
            setProjects(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    const refreshList = () => {
        retrieveProjects();
        setCurrentProject(null);
        setCurrentIndex(-1);
    };

    const setActiveProject = (project, index) => {
        setCurrentProject(project);
        setCurrentIndex(index);
    };

    const removeAllProjects = () => {
        ProjectsDataService.removeAll()
          .then(response => {
            console.log(response.data);
            refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    };

    const findByTitle = () => {
        ProjectsDataService.findByTitle(searchTitle)
          .then(response => {
            setProjects(response.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    return (
        <div className="list row">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h4>Projects List</h4>
    
            <ul className="list-group">
              {projects &&
                projects.map((project, index) => (
                  <li
                    className={
                      "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveProject(project, index)}
                    key={index}
                  >
                    {projects.title}
                  </li>
                ))}
            </ul>
    
            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={removeAllProjects}
            >
              Remove All
            </button>
          </div>
          <div className="col-md-6">
            {currentProject ? (
              <div>
                <h4>Project</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {currentProject.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>{" "}
                  {currentProject.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentProject.published ? "Published" : "Pending"}
                </div>
    
                <Link
                  to={"/projects/" + currentProject.id}
                  className="badge badge-warning"
                >
                  Edit
                </Link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>
        </div>
    );
};

export default ProjectsList;