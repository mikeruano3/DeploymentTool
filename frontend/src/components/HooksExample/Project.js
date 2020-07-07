import React, { useState, useEffect } from "react";
import dataServiceCommon from "../../services/rawdata.service";
const dataService = new dataServiceCommon('data/projects');

const Project = props => {
    const initialProjectState = {
      id: null,
      name: "",
      description: ""
    };
    const [currentProject, setCurrentProject] = useState(initialProjectState);
    const [message, setMessage] = useState("");
  
    const getProject = id => {
      dataService.findOne({id: id})
        .then(response => {
          setCurrentProject(response.data.data);
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
        name: currentProject.name,
        description: currentProject.description,
        published: status
      };
  
      dataService.update(currentProject.id, data)
        .then(response => {
          setCurrentProject({ ...currentProject, published: status });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const updateProject = () => {
      dataService.update({ id: currentProject.id }, currentProject)
        .then(response => {
          console.log(response.data);
          setMessage("The project was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteProject = () => {
      dataService.remove({ id: currentProject.id })
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
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={currentProject.name}
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