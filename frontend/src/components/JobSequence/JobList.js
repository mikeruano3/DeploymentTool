import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deployPrefix } from "../../config";
import executeTask from "../../services/execute-task";
import SlideAlertDialog from "../FeedBack/SlideAlertDialog";
import SnackbarData from "../FeedBack/SnackBar";
import { Snackbar } from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import dataServiceCommon from "../../services/rawdata.service";
const dataServiceSequenceTasks = new dataServiceCommon('data/job_sequence_tasks');
const dataServiceTasks = new dataServiceCommon('data/tasks');

const JobList = props => {
    const { currentJob }  = props;
    const [jobTasks, setJobTasks] = useState([]);
    const [currentJobTask, setCurrentJobTask] = useState(null);
    const [runningJobTask, setRunningJobTask] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [commandDesc, setCommandDesc] = useState(false);
    const [taskExecMessage, setTaskExecMessage] = useState({ consoleText: ""});
    const [alertMessage, setAlertMessage] = useState("");
    const [successOpen, setSuccessOpen] = useState(false);

    useEffect(() => {
      retrieveJobTasks()
    });

    const setActiveJobTask = (job, index) => {
        setCurrentJobTask(job);
        setCurrentIndex(index);   
    };

    const handleInputChange = event => {
      const { name, value } = event.target;
      setCurrentJobTask({ ...currentJobTask, [name]: value });
    };

    const retrieveJobTasks = async() => {
        dataServiceSequenceTasks.findMany({ job_sequence_id: currentJob.id})
          .then(async(response) => {
              let jobTasksResponse = response.data.data;
              let jobItemArray = Object.values(jobTasksResponse);
              for(let index in jobItemArray) {
                    let dataPerJobTask = new Promise((resolve, reject) => {
                      dataServiceTasks.findOne({id : jobTasksResponse[index].task_id})
                        .then(response => {
                            jobTasksResponse[index].taskdata = response.data.data;
                            resolve()
                        })
                        .catch(e => {
                            console.log(e);   
                            reject(e)
                        })
                      }
                    );
                    await dataPerJobTask;
                }
                setJobTasks(jobTasksResponse.sort((item)=>{ return item.order_number}))
            }
          ).catch(async(e) => {
              console.log(e);
          });
    };

    const executeCommmand = async(event) => {
        let start = false;
        let isSuccess = false;
        for(let index in jobTasks) {
          let jobTaskData = jobTasks[index];
          if(jobTaskData.task_id === currentJobTask.task_id){
              start = true;
          }
          if(start){
            setRunningJobTask(jobTaskData)
            let executingPerTask = new Promise((resolve, reject) => {
              executeTask(
                jobTaskData.taskdata.request_type, 
                jobTaskData.taskdata.request_url, 
                jobTaskData.taskdata.request_body
              ).then(response => {
                    setRunningJobTask(null)
                    resolve(response)
                })
                .catch(e => {
                    console.log(e);   
                    setRunningJobTask(null)
                    reject(e)
                })
              }
            );
            const result = await executingPerTask;
            let formattedresult = 
              ` Running: ${JSON.stringify(jobTaskData.taskdata.name)} ` +
              `\n Done: ${ result.data.stdout === null ? 'ERROR' : JSON.stringify(result.data.stdout)}` +
              `\n Error: ${ result.data.stderr === null ? 'ERROR' : JSON.stringify(result.data.stderr)}` +
              `\n ------------------------------------------`
              ;

            setActiveJobTask(jobTaskData, index);

            setTaskExecMessage(prevState => ({
              consoleText: prevState.consoleText.toString() + formattedresult
            }));
            
            if(result.data.stdout === "" && result.data.stderr !== ""){
              setAlertMessage(JSON.stringify(result.data.stderr));
              if(jobTaskData.continue_if_failed === 0){
                isSuccess = false;
                break;
              }
            }else{
              isSuccess = true
            }
          }
        }
        setSuccessOpen(isSuccess)
    };

    const handleCloseSuccess = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setSuccessOpen(false);
    };

    const classesSucessButton = SnackbarData.useStyles();
    
    return (
        <div className="container-fluid">
          <div className="row">
              {runningJobTask  && (
                <LinearProgress />
              )}
              {taskExecMessage.consoleText !== ""  && (
                <div className="col-xl-12">
                  <div className="overflow-auto">
                      <textarea 
                        type="text"
                        rows="3"
                        className="form-control form-control-sm"
                        name="request_body"
                        value={taskExecMessage.consoleText}
                        disabled={true}
                      >
                      </textarea>
                  </div>
                  <br/>
                </div>
              )}
              {alertMessage && alertMessage !== ""  && (
                <SlideAlertDialog messageHeader={"Error"} messageBody={alertMessage} setAlertMessage={setAlertMessage}/>
              )}
              <div className={classesSucessButton.root}>
                        <Snackbar 
                          anchorOrigin={{ vertical: "top", horizontal: "center" }}
                          open={successOpen} 
                          autoHideDuration={3000}  onClose={handleCloseSuccess}>
                          <SnackbarData.Alert onClose={handleCloseSuccess} severity="success">
                            Success!
                          </SnackbarData.Alert>
                        </Snackbar>
              </div>
              
          </div>
          <div className="row">
            <div className="col-xl-8">
            {runningJobTask  && (
                    <div>
                        <span className="spinner-border spinner-border-sm"></span>
                        <span>{"  "}Running {runningJobTask.taskdata.name}....</span>
                        <br />
                        <br />
                    </div>
            )}

              <h4>Tasks List</h4>
              <ul className="list-group">
                {jobTasks &&
                  jobTasks.map((task, index) => (
                    <li
                      className={
                        "list-group-item " + (runningJobTask ?
                          ( task.taskdata.id === runningJobTask.taskdata.id ? "active" : "" )
                          :
                          ( index === currentIndex ? "active": "")
                          )
                      }
                      onClick={() => setActiveJobTask(task, index)}
                      key={index}
                    >
                      {task.taskdata && ( 
                          <label>
                            <span className="badge badge-pill badge-light">{task.taskdata.order_number}</span>
                            {" "} 
                            {task.taskdata.name} 
                            {" "} 
                          </label>
                       )}
                        {runningJobTask 
                            && task.taskdata.id === runningJobTask.taskdata.id && (
                          <span className="spinner-border spinner-border-sm"></span>
                        )}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-xl-4">
                {currentJobTask ? (
                <div>
                  <h5>{currentJobTask.taskdata.name} {" "}</h5>
                  <div>
                    {
                      currentJobTask.taskdata.request_body !== "" ? 
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
                                value={currentJobTask.taskdata.request_body}
                                onChange={handleInputChange}
                            >
                            </textarea>
                        </div>
                      ) : (
                          <div></div>
                      )
                    }

                    { !runningJobTask ? (
                        <div>
                            <button
                            type="submit"
                            className="badge badge-success"
                            value={currentJobTask.id}
                            onClick={executeCommmand}
                            >
                            Execute Task
                            </button>
                            {"  "}
                            <Link
                                to={`${deployPrefix}/tasks/` + currentJobTask.task_id}
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
                    
                  <button className="badge badge-primary" onClick={ () => { setCommandDesc(!commandDesc) } }>
                          { commandDesc ? "Hide info" : "Show info" }
                  </button>
                      { commandDesc 
                            && (
                              <div>
                                <label>
                                  <strong>Command: {" "}</strong>
                                  {currentJobTask.taskdata.description}
                                </label>
                                <label>
                                  <strong>Method:{" "}</strong>
                                  {currentJobTask.taskdata.request_type}{" : "}
                                  {currentJobTask.taskdata.request_url}
                                </label>
                                <label>
                                  <strong>Task Type:{" "}</strong>
                                  {currentJobTask.taskdata.task_type}
                                </label>
                              </div>
                    )}
              </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Task...</p>
                </div>
              )}
            </div>
          </div>
        </div>
    );
};

export default JobList;