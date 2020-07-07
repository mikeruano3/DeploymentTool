import React, { useState } from "react";
import dataServiceCommon from "../../services/rawdata.service";
const dataService = new dataServiceCommon('data/projects');

const AddProject = () => {
    const initialProjectState = {
      id: null,
      name: "",
      description: "",
      published: false
    };
    const [project, setProject] = useState(initialProjectState);
    const [submitted, setSubmitted] = useState(false);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setProject({ ...project, [name]: value });
    };
  
    const saveProject = () => {
      var data = {
        name: project.name,
        description: project.description
      };
  
      dataService.insertOne(data)
        .then(response => {
          setProject({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            published: response.data.published
          });
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const newProject = () => {
      setProject(initialProjectState);
      setSubmitted(false);
    };
  
    return (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={newProject}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={project.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>
    
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={project.description}
                  onChange={handleInputChange}
                  name="description"
                />
              </div>
    
              <button onClick={saveProject} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
    );
};
  
export default AddProject;