import React, { useState, useEffect } from "react";
import ProjectsDataService from "../../services/ProjectsDataService";

const Project = props => {
    const initialProjectState = {
      id: null,
      title: "",
      description: "",
      published: false
    };
    const [currentProject, setCurrentProject] = useState(initialProjectState);
    const [message, setMessage] = useState("");
  
    const getProject = id => {
      ProjectsDataService.get(id)
        .then(response => {
          setCurrentProject(response.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    useEffect(() => {
        getProject(props.match.params.id);
    }, [props.match.params.id]);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentProject({ ...currentProject, [name]: value });
    };
  
    const updatePublished = status => {
      var data = {
        id: currentProject.id,
        title: currentProject.title,
        description: currentProject.description,
        published: status
      };
  
      ProjectsDataService.update(currentProject.id, data)
        .then(response => {
          setCurrentProject({ ...currentProject, published: status });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const updateProject = () => {
      ProjectsDataService.update(currentProject.id, currentProject)
        .then(response => {
          console.log(response.data);
          setMessage("The tutorial was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteProject = () => {
      ProjectsDataService.remove(currentProject.id)
        .then(response => {
          console.log(response.data);
          props.history.push("/projects");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    return (
        <div>
          {currentProject ? (
            <div className="edit-form">
              <h4>Project</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={currentProject.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={currentProject.description}
                    onChange={handleInputChange}
                  />
                </div>
    
                <div className="form-group">
                  <label>
                    <strong>Status:</strong>
                  </label>
                  {currentProject.published ? "Published" : "Pending"}
                </div>
              </form>
    
              {currentProject.published ? (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => updatePublished(false)}
                >
                  UnPublish
                </button>
              ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => updatePublished(true)}
                >
                  Publish
                </button>
              )}
    
              <button className="badge badge-danger mr-2" onClick={deleteProject}>
                Delete
              </button>
    
              <button
                type="submit"
                className="badge badge-success"
                onClick={updateProject}
              >
                Update
              </button>
              <p>{message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
    );    
};
  
export default Project;