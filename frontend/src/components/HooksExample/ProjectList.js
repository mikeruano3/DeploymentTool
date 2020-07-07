import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskList from "../Task/TaskList";
import dataServiceCommon from "../../services/rawdata.service";
const dataService = new dataServiceCommon('data/projects');

const ProjectList = props => {
    // initialize
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        retrieveProjects();
    }, []);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const retrieveProjects = () => {
      dataService.getAll()
          .then(response => {
            setProjects(response.data.data);
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
      dataService.removeAll()
          .then(response => {
            console.log(response.data);
            refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    };

    const findByName = () => {
      dataService.findMany({ name: searchName})
          .then(response => {
            setProjects(response.data.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    return (
        <div className="container">
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={findByName}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
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
                      {project.name}
                      <br />
                      {project.description}
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
            <div className="col-md-3">
              {currentProject ? (
                <div>
                  <h4>Project</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentProject.name}
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
            <div className="col md-4">
              <TaskList/>
            </div>
          </div>
        </div>
    );
};

export default ProjectList;