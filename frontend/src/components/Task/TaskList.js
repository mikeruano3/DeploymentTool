import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import executeTask from "../../services/execute-task";
import SlideAlertDialog from "../FeedBack/SlideAlertDialog";
import SnackbarData from "../FeedBack/SnackBar";
import JobList from "../JobSequence/JobList";
import dataServiceCommon from "../../services/rawdata.service";
import { Snackbar } from "@material-ui/core";
const dataServiceTasks = new dataServiceCommon('data/tasks');

const TaskList = props => {
    // Tasks
    const taskArray = props.currentProject.tasklist;
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [runningTask, setRunningTask] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    // Jobs
    const jobsArray = props.currentProject.jobsequences;
    const [jobs, setJobs] = useState([]);
    const [currentJob, setCurrentJob] = useState(null);
    const [runningJob, setRunningJob] = useState(null);
    const [currentJobIndex, setCurrentJobIndex] = useState(-1);
    const [alertMessage, setAlertMessage] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);

    useEffect(() => {
        setTasks(taskArray);
        setJobs(jobsArray);
        
        setCurrentJob(null);
        setCurrentJobIndex(-1);
        setCurrentTask(null);
        setCurrentIndex(-1);
    }, [taskArray, jobsArray]);

    const onChangeSearchName = e => {
        const searchName = e.target.value;
        setSearchName(searchName);
    };

    const refreshList = () => {
        setTasks(taskArray);
        setJobs(jobsArray);
        setCurrentTask(null);
        setCurrentIndex(-1);
    };

    const setActiveTask = (task, index) => {
        setCurrentTask(task);
        setCurrentIndex(index);

        setCurrentJob(null);
        setCurrentJobIndex(-1);
    };

    const setActiveJob = (job, index) => {
        setCurrentJob(job);
        setCurrentJobIndex(index);

        setCurrentTask(null);
        setCurrentIndex(-1);
    };

    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentTask({ ...currentTask, [name]: value });
    };

    const executeCommmand = event => {
        setRunningTask(currentTask);
        setRunningJob(currentJob);
        executeTask(
            currentTask.request_type, 
            currentTask.request_url, 
            currentTask.request_body
        ).then(
            (response) => {
                setRunningTask(null);
                setRunningJob(null);
                console.log(response)
                if(response.data.stdout === "" && response.data.stderr !== ""){
                    setAlertMessage(JSON.stringify(response.data))
                }else{
                    setSuccessOpen(true)
                }
            },(error) => {
                setRunningJob(null);
                setRunningTask(null);
                console.log(error)
        });
    };

    const removeAllTasks = () => {
      dataServiceTasks.removeAll()
          .then(response => {
            console.log(response.data);
            refreshList();
          })
          .catch(e => {
            console.log(e);
          });
    };

    const findByName = () => {
      dataServiceTasks.findMany({ name: searchName})
          .then(response => {
            setTasks(response.data.data);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    };

    const handleCloseSuccess = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSuccessOpen(false);
    };

    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6">
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
              <div>
                <h5>Job Sequences List</h5>
                <ul className="list-group">
                  {jobs &&
                    jobs.map((job, index) => (
                      <li
                        className={
                          "list-group-item " + (index === currentJobIndex ? "active" : "")
                        }
                        onClick={() => setActiveJob(job, index)}
                        key={index}
                      >
                          {job.name}{" "} 
                          
                          {runningJob 
                              && job.id === runningJob.id && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                      </li>
                    ))}
                </ul>
                <br/>
                <h5>Tasks List</h5>
                <ul className="list-group">
                {alertMessage && alertMessage !== ""  && (
                  <SlideAlertDialog messageHeader={"Error"} messageBody={alertMessage} setAlertMessage={setAlertMessage}/>
                )}

                  <div>
                        <Snackbar 
                          anchorOrigin={{ vertical: "top", horizontal: "center" }}
                          open={successOpen} 
                          autoHideDuration={3000}  onClose={handleCloseSuccess}>
                          <SnackbarData.Alert onClose={handleCloseSuccess} severity="success">
                            Success!
                          </SnackbarData.Alert>
                        </Snackbar>
                  </div>

                  {tasks &&
                    tasks.map((task, index) => (
                      <li
                        className={
                          "list-group-item " + (index === currentIndex ? "active" : "")
                        }
                        onClick={() => setActiveTask(task, index)}
                        key={index}
                      >
                          {task.name}{" "} 
                          
                          {runningTask 
                              && task.id === runningTask.id && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                      </li>
                    ))}
                </ul>
        
                <button
                  className="m-3 btn btn-sm btn-danger"
                  onClick={removeAllTasks}
                >
                  Remove All
                </button>
              </div>
            </div>
            <div className="col-xl-6">
                {runningTask  && (
                        <div>
                            <span className="spinner-border spinner-border-sm"></span>
                            <span>{"  "}Running {runningTask.name}....</span>
                            <br />
                            <br />
                        </div>
                )}
                {currentTask ? (
                <div>
                  <h4>{currentTask.name} {" "}</h4>
                  <div>
                    {
                      currentTask.request_body !== "" ? 
                      (
                        <div className="form-group">
                            <label htmlFor="requestBody">
                              <strong>Request Body:{" "}</strong>
                            </label>
                            <textarea 
                                type="text"
                                rows="2"
                                className="form-control"
                                name="request_body"
                                value={currentTask.request_body}
                                onChange={handleInputChange}
                            >
                            </textarea>
                        </div>
                      ) : (
                          <div></div>
                      )
                    }
                    { !runningTask ? (
                        <div>
                            <button
                            type="submit"
                            className="badge badge-success"
                            value={currentTask.id}
                            onClick={executeCommmand}
                            >
                            Execute Task
                            </button>
                            {"  "}
                            <Link
                                to={"/tasks/" + currentTask.id}
                                className="badge badge-warning"
                            >
                                Edit Task
                            </Link>

                        </div>
                        ) : (
                            <p className="font-italic">
                                Waiting for task to complete...
                            </p>
                        )
                    }
                  </div>
                  <div>
                    <label>
                      <strong>Command description:{" "}</strong>
                      {currentTask.description}
                    </label>

                    <label>
                      <strong>Order Number:{" "}</strong>
                      {currentTask.order_number}
                    </label>

                    <label>
                      <strong>URL ({currentTask.request_type}){" : "}</strong>
                      {currentTask.request_url}
                    </label>

                    <label>
                      <strong>Task Type:{" "}</strong>
                      {currentTask.task_type}
                    </label>
                  </div>
                  
                  
              </div>
              ) : (
                <div>
                {
                  currentJob ? (
                    <div>
                        <JobList currentJob={currentJob} />
                    </div>
                  ) : (
                    <p>Please click on a Task...</p>
                  )
                }
                </div>
              )}
            </div>
          </div>
        </div>
    );
};

export default TaskList;