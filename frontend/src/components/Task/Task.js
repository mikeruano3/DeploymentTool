import React, { useState, useEffect } from "react";
import dataServiceCommon from "../../services/rawdata.service";
const dataService = new dataServiceCommon('data/tasks');

const Task = props => {
    const initialTaskState = {
      id: 0,
      name: "",
      description: "",
      order_number: 0, 
      task_type: 0,
      request_type: "", 
      request_url: "", 
      request_body: "", 
      project_id: 0
    };
    const [currentTask, setCurrentTask] = useState(initialTaskState);
    const [message, setMessage] = useState("");
  
    const getTask = id => {
      dataService.findOne({id: id})
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
  
    const updateTask = () => {
      dataService.update({ id: currentTask.id }, currentTask)
        .then(response => {
          console.log(response.data);
          setMessage("The task was updated successfully!");
        })
        .catch(e => {
          console.log(e);
        });
    };
  
    const deleteTask = () => {
      dataService.remove({ id: currentTask.id })
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
              <h4>Task {currentTask.id}</h4>
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
                  <label htmlFor="order_number">Order Number</label>
                  <input
                    type="number"
                    className="form-control"
                    id="order_number"
                    name="order_number"
                    value={currentTask.order_number}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="task_type">Task Type</label>
                  <input
                    type="number"
                    className="form-control"
                    id="task_type"
                    name="task_type"
                    value={currentTask.task_type}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="request_type">Request Type</label>
                  <input
                    type="text"
                    className="form-control"
                    id="request_type"
                    name="request_type"
                    value={currentTask.request_type}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="request_url">Request URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="request_url"
                    name="request_url"
                    value={currentTask.request_url}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="request_body">Request Body</label>
                  <input
                    type="text"
                    className="form-control"
                    id="request_body"
                    name="request_body"
                    value={currentTask.request_body}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="project_id">Project Id</label>
                  <input
                    type="number"
                    className="form-control"
                    id="project_id"
                    name="project_id"
                    value={currentTask.project_id}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
    
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