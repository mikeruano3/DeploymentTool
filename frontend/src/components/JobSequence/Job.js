import React, { useState, useEffect } from "react";
import dataServiceCommon from "../../services/rawdata.service";
const dataService = new dataServiceCommon('data/tasks');

const Task = props => {
    const initialTaskState = {
      id: null,
      name: null,
      description: null,
      order_number: 0, 
      task_type: 0,
      request_type: null, 
      request_url: null, 
      request_body: null, 
      project_id: 0
    };
    const [currentTask, setCurrentTask] = useState(initialTaskState);
    const [message, setMessage] = useState("");
  
    const getTask = id => {
      dataService.get(id)
        .then(response => {
          setCurrentTask(response.data.data);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    useEffect(() => {
        getTask(props.match.params.id);
    }, [props.match.params.id]);
  
    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentTask({ ...currentTask, [name]: value });
    };
  
    const updatePublished = status => {
      var data = {
        id: currentProject.id,
        title: currentProject.title,
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
  
    const updateTask = () => {
      dataService.update({ id: currentProject.id }, currentProject)
        .then(response => {
          console.log(response.data);
          setMessage("The task was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteTask = () => {
      dataService.remove({ id: currentProject.id })
        .then(response => {
          console.log(response.data);
          props.history.push("/tasks");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    return (
        <div>
          {currentTask ? (
            <div className="edit-form">
              <h4>Task</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={currentTask.name}
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
                    value={currentTask.description}
                    onChange={handleInputChange}
                  />
                </div>
    
                <div className="form-group">
                  <label>
                    <strong>Status:</strong>
                  </label>
                  {currentTask.published ? "Published" : "Pending"}
                </div>
              </form>
    
              {currentTask.published ? (
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
    
              <button className="badge badge-danger mr-2" onClick={deleteTask}>
                Delete
              </button>
    
              <button
                type="submit"
                className="badge badge-success"
                onClick={updateTask}
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
  
export default Task;