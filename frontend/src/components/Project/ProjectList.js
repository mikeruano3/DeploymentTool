import React, { Component } from "react";
import { Link } from "react-router-dom";
import TaskList from '../Task/TaskList';
import dataServiceCommon from "../../services/rawdata.service";
const projectDataService = new dataServiceCommon('data/projects');
const taskDataService = new dataServiceCommon('data/tasks');
const jobSequenceDataService = new dataServiceCommon('data/job_sequences');

export default class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.retrieveProjects = this.retrieveProjects.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProject = this.setActiveProject.bind(this);
    this.removeAllProjects = this.removeAllProjects.bind(this);

    this.state = {
      projects: [],
      currentProject: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrieveProjects();
  }

  retrieveProjects() {
    projectDataService.getAll()
      .then(response => {
        this.setState({
          projects: response.data.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProjects();
    this.setState({
      currentProject: null,
      currentIndex: -1
    });
  }

  setActiveProject(project, index) {
    taskDataService.findMany({ project_id : project.id }).then(response => {
        project.tasklist = response.data.data;
        this.setState({
            currentProject: project,
            currentIndex: index
        });
      
          jobSequenceDataService.findMany({ project_id : project.id }).then(response => {
              project.jobsequences = response.data.data;
              this.setState({
                  currentProject: project,
                  currentIndex: index
              });
          }).catch(e => {
              console.log(e);
          });

      }).catch(e => {
        console.log(e);
        this.setState({
          currentProject: project,
          currentIndex: index
        });
      });
  }

  removeAllProjects() {
    projectDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { projects, currentProject, currentIndex } = this.state;

    return (
      <div className="">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">

              <h4>Projects List</h4>
              
              <ul className="list-group">
                {projects &&
                  projects.map((project, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActiveProject(project, index)}
                      key={index}
                    >
                      {project.name}
                    </li>
                  ))}
              </ul>
              <br />
              {currentProject ? (
                <div>
                  <h4>{currentProject.name}</h4>
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
                  <p>Please click on a Project...</p>
                </div>
              )}
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllProjects}
              >
                Remove All
              </button>
              

            </div>
            <div className="col md-9">
              {currentProject ? (
                <div>

                  {currentProject.tasklist ? (
                      <div>
                        <TaskList currentProject={currentProject} />
                      </div>
                    ) : (
                      <div>
                        <h4>This project has no Tasks!</h4>
                      </div>
                    )}
                </div>
              ) : (
                <div>
                </div>
              )}
            </div>
          </div>
        </div>  
      </div>
    );
  }
}